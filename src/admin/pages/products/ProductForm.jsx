import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import ImageUploader from "../../components/ImageUploader";
import TagInput from "../../components/TagInput";
import {
    createAdminProduct,
    fetchAdminProductById,
    updateAdminProduct,
} from "../../../Services/adminProduct.service";
import { getCategoryList } from "../../../Services/category.service";

const validationSchema = Yup.object().shape({
    title: Yup.string().required("Product name is required"),
    description: Yup.string().required("Description is required"),
    stock_quantity: Yup.number().min(0).required("Stock is required"),
    regular_price: Yup.number().min(0).required("Regular price is required"),
});

const ProductForm = () => {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [images, setImages] = useState([]);
    const [initialValues, setInitialValues] = useState({
        title: "",
        description: "",
        summary: "",
        stock_quantity: 0,
        sale_price: "",
        regular_price: "",
        sku: "",
    });
    const initialRemoteImagesRef = useRef([]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const list = await getCategoryList();
                setCategories(list);
            } catch (error) {
                toast.error("Failed to load categories");
            }
        };
        loadCategories();
    }, []);

    useEffect(() => {
        if (!isEdit) return;
        const loadProduct = async () => {
            try {
                const product = await fetchAdminProductById(id);
                setInitialValues({
                    title: product.title,
                    description: product.description ?? "",
                    summary: product.summary ?? "",
                    stock_quantity: product.stock_quantity ?? 0,
                    sale_price: product.sale_price ?? "",
                    regular_price: product.regular_price ?? product.price ?? "",
                    sku: product.sku ?? "",
                });
                const remoteImages =
                    product.images?.map(image => ({ ...image, source: "remote" })) ?? [];
                setImages(remoteImages);
                initialRemoteImagesRef.current = remoteImages;
                setTags(product.tags || []);
                setSelectedCategories(product.categories?.map(category => category.id) || []);
            } catch (error) {
                toast.error(error.message);
            }
        };
        loadProduct();
    }, [id, isEdit]);

    const toggleCategory = categoryId => {
        setSelectedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId],
        );
    };

    const handleSubmit = async values => {
        if (!selectedCategories.length) {
            toast.error("Please select at least one category");
            return;
        }
        if (!images.length) {
            toast.error("Please upload at least one product image");
            return;
        }
        const payload = {
            title: values.title,
            description: values.description,
            summary: values.summary,
            stock_quantity: Number(values.stock_quantity),
            sale_price: values.sale_price ? Number(values.sale_price) : null,
            regular_price: values.regular_price ? Number(values.regular_price) : null,
            price: values.sale_price ? Number(values.sale_price) : Number(values.regular_price),
            sku: values.sku,
            tags,
            categories: selectedCategories,
            images,
        };

        const toastId = toast.loading(isEdit ? "Updating product..." : "Creating product...");
        try {
            if (isEdit) {
                const removedImages = initialRemoteImagesRef.current.filter(
                    initialImage => !images.some(img => img.id === initialImage.id),
                );
                await updateAdminProduct(id, { ...payload, removedImages });
                toast.success("Product updated");
            } else {
                await createAdminProduct(payload);
                toast.success("Product created");
            }
            navigate("/admin/products");
        } catch (error) {
            toast.error(error.message);
        } finally {
            toast.dismiss(toastId);
        }
    };

    const formTitle = isEdit ? "Product Details" : "Add Product";

    return (
        <div className="space-y-6">
            <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600"
            >
                <ArrowLeft size={16} />
                Back
            </button>

            <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <p className="text-sm text-gray-500 mb-1">All Products &gt; {formTitle}</p>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">{formTitle}</h2>

                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <label className="text-sm font-medium text-gray-700">
                                        Product Name
                                    </label>
                                    <Field
                                        name="title"
                                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                    />
                                    {errors.title && touched.title && (
                                        <p className="text-xs text-rose-500">{errors.title}</p>
                                    )}
                                </div>
                                <div className="space-y-4">
                                    <label className="text-sm font-medium text-gray-700">SKU</label>
                                    <Field
                                        name="sku"
                                        placeholder="#32A53"
                                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <Field
                                    as="textarea"
                                    name="description"
                                    rows={4}
                                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                />
                                {errors.description && touched.description && (
                                    <p className="text-xs text-rose-500">{errors.description}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Summary</label>
                                <Field
                                    name="summary"
                                    placeholder="Short summary"
                                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Category
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {categories.map(category => (
                                            <button
                                                type="button"
                                                key={category.id}
                                                onClick={() => toggleCategory(category.id)}
                                                className={`px-4 py-2 rounded-xl border text-sm ${
                                                    selectedCategories.includes(category.id)
                                                        ? "bg-emerald-500 text-white border-emerald-500"
                                                        : "border-gray-200 text-gray-600"
                                                }`}
                                            >
                                                {category.title}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Stock Quantity
                                    </label>
                                    <Field
                                        name="stock_quantity"
                                        type="number"
                                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Sale Price
                                    </label>
                                    <Field
                                        name="sale_price"
                                        type="number"
                                        placeholder="₹450"
                                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Regular Price
                                    </label>
                                    <Field
                                        name="regular_price"
                                        type="number"
                                        placeholder="₹110.40"
                                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                    />
                                    {errors.regular_price && touched.regular_price && (
                                        <p className="text-xs text-rose-500">
                                            {errors.regular_price}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Tags</label>
                                <TagInput value={tags} onChange={setTags} />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Product Images
                                </label>
                                <ImageUploader images={images} onChange={setImages} />
                            </div>

                            <div className="flex flex-wrap gap-3 justify-end">
                                <button
                                    type="button"
                                    onClick={() => navigate("/admin/products")}
                                    className="px-5 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-5 py-2 rounded-xl bg-emerald-500 text-white text-sm font-semibold disabled:opacity-50"
                                >
                                    {isEdit ? "Update" : "Add Product"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ProductForm;
