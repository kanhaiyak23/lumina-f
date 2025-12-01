import { supabase } from "../supabaseClient";
import { ORDER_STATUS, PAYMENT_STATUS } from "../constants/status";

const ORDER_BASE_SELECT = `
    id,
    user_id,
    address_id,
    order_status_id,
    payment_status_id,
    total_price,
    razorpay_order_id,
    created_at,
    updated_at,
    order_status:order_status_id ( id, code, label ),
    payment_status:payment_status_id ( id, code, label ),
    user:user_id ( id, name, email, mobile_number ),
    address:address_id ( id, address, city, state, pincode, mobile_number ),
    payment_transaction ( id, razorpay_payment_id, razorpay_status, created_at ),
    order_item (
        id,
        quantity,
        price,
        product:product_id (
            id,
            title,
            price,
            sale_price,
            regular_price,
            product_image ( image_url, created_at, id )
        )
    )
`;

const ensureSuccess = (context, error) => {
    if (error) {
        throw new Error(`Unable to ${context}: ${error.message}`);
    }
};

const formatOrder = order => ({
    ...order,
    items:
        order.order_item?.map(item => ({
            ...item,
            product: {
                ...item.product,
                image:
                    item.product?.product_image?.[0]?.image_url ??
                    item.product?.product_image?.image_url ??
                    null,
            },
        })) || [],
    status: order.order_status ?? null,
    payment: order.payment_status ?? null,
});

export const fetchAdminOrders = async ({
    page = 1,
    limit = 10,
    status,
    search,
    dateRange = {},
} = {}) => {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
        .from("order")
        .select(ORDER_BASE_SELECT, { count: "exact" })
        .order("created_at", { ascending: false });

    if (status) {
        query = query.eq("order_status_id", status);
    }

    if (search) {
        query = query.or(
            `id.ilike.%${search}%,user(name).ilike.%${search}%,user(email).ilike.%${search}%`,
        );
    }

    if (dateRange?.from && dateRange?.to) {
        query = query.gte("created_at", dateRange.from).lte("created_at", dateRange.to);
    }

    const { data, error, count } = await query.range(from, to);
    ensureSuccess("load orders", error);

    return {
        orders: data.map(formatOrder),
        total: count ?? 0,
        page,
        pageSize: limit,
    };
};

export const fetchAdminOrderById = async orderId => {
    const { data, error } = await supabase
        .from("order")
        .select(ORDER_BASE_SELECT)
        .eq("id", orderId)
        .single();
    ensureSuccess("load order", error);
    return formatOrder(data);
};

export const updateAdminOrderStatus = async (
    orderId,
    { orderStatusId, paymentStatusId, admin_note },
) => {
    const payload = {};
    if (orderStatusId) payload.order_status_id = orderStatusId;
    if (paymentStatusId) payload.payment_status_id = paymentStatusId;
    if (typeof admin_note === "string") payload.admin_note = admin_note;

    const { error } = await supabase.from("order").update(payload).eq("id", orderId);
    ensureSuccess("update order", error);
    return fetchAdminOrderById(orderId);
};

export const computeOrderStatusSummary = orders => {
    const summary = {
        total: 0,
        pending: 0,
        active: 0,
        delivered: 0,
        cancelled: 0,
    };

    summary.total = orders.length;

    orders.forEach(order => {
        const statusId = order.order_status_id;
        if (statusId === ORDER_STATUS.PENDING.id) summary.pending += 1;
        if (statusId === ORDER_STATUS.SHIPPED.id) summary.active += 1;
        if (statusId === ORDER_STATUS.DELIVERED.id) summary.delivered += 1;
        if (statusId === ORDER_STATUS.CANCELLED.id) summary.cancelled += 1;
    });

    summary.active += summary.pending; // treat pending as active pipeline
    return summary;
};
