import { supabase } from "../supabaseClient";

const PRODUCT_IMAGE_BUCKET = "product-images";

const PRODUCT_SELECT = `
    id,
    title,
    description,
    summary,
    sku,
    price,
    sale_price,
    regular_price,
    stock_quantity,
    tags,
    created_at,
    product_image ( id, image_url, created_at ),
    product_category_relation (
        id,
        category:category_id ( id, title )
    )
`;

const formatProduct = product => ({
    ...product,
    sale_price: product.sale_price ?? null,
    regular_price: product.regular_price ?? product.price,
    tags: product.tags || [],
    categories:
        product.product_category_relation?.map(rel => ({
            id: rel.category?.id,
            title: rel.category?.title,
        })) || [],
    images:
        product.product_image?.map(image => ({
            id: image.id,
            image_url: image.image_url,
            created_at: image.created_at,
        })) || [],
});

const ensureSuccess = (operation, error) => {
    if (error) {
        throw new Error(`Unable to ${operation}: ${error.message}`);
    }
};

const extractStoragePath = url => {
    if (!url) return null;
    const marker = `/storage/v1/object/public/${PRODUCT_IMAGE_BUCKET}/`;
    const idx = url.indexOf(marker);
    if (idx === -1) return null;
    return url.substring(idx + marker.length);
};

const uploadImageToStorage = async (productId, file) => {
    const extension = file.name.split(".").pop();
    const fileName = `${productId}/${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.${extension}`;

    const { error: uploadError } = await supabase.storage
        .from(PRODUCT_IMAGE_BUCKET)
        .upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
        });
    ensureSuccess("upload product image", uploadError);

    const {
        data: { publicUrl },
    } = supabase.storage.from(PRODUCT_IMAGE_BUCKET).getPublicUrl(fileName);

    const { data, error } = await supabase
        .from("product_image")
        .insert([{ product_id: productId, image_url: publicUrl }])
        .select()
        .single();
    ensureSuccess("store product image reference", error);

    return data;
};

const removeImage = async imageRecord => {
    if (!imageRecord) return;
    const { error } = await supabase.from("product_image").delete().eq("id", imageRecord.id);
    ensureSuccess("delete product image record", error);

    const storagePath = extractStoragePath(imageRecord.image_url);
    if (storagePath) {
        const { error: storageError } = await supabase.storage
            .from(PRODUCT_IMAGE_BUCKET)
            .remove([storagePath]);
        if (storageError) {
            console.warn("Failed to remove file from storage:", storageError.message);
        }
    }
};

const syncProductCategories = async (productId, categoryIds = []) => {
    const { error: deleteError } = await supabase
        .from("product_category_relation")
        .delete()
        .eq("product_id", productId);
    ensureSuccess("detach previous categories", deleteError);

    if (!categoryIds.length) return;

    const payload = categoryIds.map(categoryId => ({
        product_id: productId,
        category_id: categoryId,
    }));

    const { error: insertError } = await supabase.from("product_category_relation").insert(payload);
    ensureSuccess("attach categories", insertError);
};

export const fetchAdminProducts = async () => {
    const { data, error } = await supabase
        .from("product")
        .select(PRODUCT_SELECT)
        .order("created_at", {
            ascending: false,
        });
    ensureSuccess("load products", error);
    return data.map(formatProduct);
};

export const fetchAdminProductById = async productId => {
    const { data, error } = await supabase
        .from("product")
        .select(PRODUCT_SELECT)
        .eq("id", productId)
        .single();
    ensureSuccess("load product", error);
    return formatProduct(data);
};

export const createAdminProduct = async ({ categories = [], images = [], ...productData }) => {
    const { data: product, error } = await supabase
        .from("product")
        .insert([
            {
                ...productData,
                price: Number(productData.price ?? productData.regular_price ?? 0),
                regular_price: productData.regular_price ?? productData.price ?? null,
                sale_price: productData.sale_price ?? null,
                stock_quantity: Number(productData.stock_quantity ?? 0),
            },
        ])
        .select()
        .single();
    ensureSuccess("create product", error);

    await syncProductCategories(product.id, categories);

    // upload new images
    for (const image of images) {
        if (image.file) {
            await uploadImageToStorage(product.id, image.file);
        }
    }

    return fetchAdminProductById(product.id);
};

export const updateAdminProduct = async (
    productId,
    { categories = [], images = [], removedImages = [], ...productData },
) => {
    const { data, error } = await supabase
        .from("product")
        .update({
            ...productData,
            price: Number(productData.price ?? productData.regular_price ?? 0),
            regular_price: productData.regular_price ?? productData.price ?? null,
            sale_price: productData.sale_price ?? null,
            stock_quantity: Number(productData.stock_quantity ?? 0),
        })
        .eq("id", productId)
        .select()
        .single();
    ensureSuccess("update product", error);

    await syncProductCategories(productId, categories);

    for (const removed of removedImages) {
        await removeImage(removed);
    }

    for (const image of images) {
        if (image.file) {
            await uploadImageToStorage(productId, image.file);
        }
    }

    return fetchAdminProductById(productId);
};

export const deleteAdminProduct = async productId => {
    // delete related relations first
    const { data: imageRecords } = await supabase
        .from("product_image")
        .select("id, image_url")
        .eq("product_id", productId);

    if (imageRecords?.length) {
        for (const image of imageRecords) {
            await removeImage(image);
        }
    }

    await supabase.from("product_category_relation").delete().eq("product_id", productId);
    const { error } = await supabase.from("product").delete().eq("id", productId);
    ensureSuccess("remove product", error);
    return true;
};
