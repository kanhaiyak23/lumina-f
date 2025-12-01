export const ORDER_STATUS = {
    PENDING: {
        id: "c655bd8a-1269-4f51-b988-8d2c0940124e",
        code: "pending",
        label: "Pending",
        tagColor: "bg-amber-100 text-amber-700 border-amber-200",
    },
    SHIPPED: {
        id: "7a60caca-3022-4c64-a738-7a185c33786c",
        code: "shipped",
        label: "Shipped",
        tagColor: "bg-blue-100 text-blue-700 border-blue-200",
    },
    DELIVERED: {
        id: "f2f1fda9-2331-47a1-9e5d-2f7099e31f9f",
        code: "delivered",
        label: "Delivered",
        tagColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
    },
    CANCELLED: {
        id: "bd90a426-0df7-4544-9dc4-29b4a6a04376",
        code: "cancelled",
        label: "Cancelled",
        tagColor: "bg-rose-100 text-rose-700 border-rose-200",
    },
};

export const PAYMENT_STATUS = {
    PENDING: {
        id: "b0da5557-8afc-436d-a6a6-5d1e54d3e362",
        code: "pending",
        label: "Pending",
    },
    PAID: {
        id: "f4ee5a71-33a0-4576-9ed5-6f61243c5c7d",
        code: "paid",
        label: "Paid",
    },
    FAILED: {
        id: "5d98892a-4b41-4b91-94ee-4e0e5c60d13d",
        code: "failed",
        label: "Failed",
    },
};

export const ORDER_STATUS_OPTIONS = Object.values(ORDER_STATUS);
export const PAYMENT_STATUS_OPTIONS = Object.values(PAYMENT_STATUS);
