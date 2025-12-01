import { supabase } from "../supabaseClient";
import { ORDER_STATUS } from "../constants/status";

const ensureSuccess = (context, error) => {
    if (error) {
        throw new Error(`Unable to ${context}: ${error.message}`);
    }
};

export const fetchDashboardStats = async () => {
    const [totalOrdersRes, activeOrdersRes, deliveredOrdersRes, cancelledOrdersRes, revenueRes] =
        await Promise.all([
            supabase.from("order").select("id", { count: "exact", head: true }),
            supabase
                .from("order")
                .select("id", { count: "exact", head: true })
                .in("order_status_id", [ORDER_STATUS.PENDING.id, ORDER_STATUS.SHIPPED.id]),
            supabase
                .from("order")
                .select("id", { count: "exact", head: true })
                .eq("order_status_id", ORDER_STATUS.DELIVERED.id),
            supabase
                .from("order")
                .select("id", { count: "exact", head: true })
                .eq("order_status_id", ORDER_STATUS.CANCELLED.id),
            supabase.from("order").select("total_price"),
        ]);

    ensureSuccess("fetch dashboard totals", totalOrdersRes.error);
    ensureSuccess("fetch active orders", activeOrdersRes.error);
    ensureSuccess("fetch delivered orders", deliveredOrdersRes.error);
    ensureSuccess("fetch cancelled orders", cancelledOrdersRes.error);
    ensureSuccess("fetch revenue details", revenueRes.error);

    const revenue =
        revenueRes.data?.reduce((acc, order) => acc + Number(order.total_price || 0), 0) ?? 0;

    return {
        totalOrders: totalOrdersRes.count ?? 0,
        activeOrders: activeOrdersRes.count ?? 0,
        completedOrders: deliveredOrdersRes.count ?? 0,
        cancelledOrders: cancelledOrdersRes.count ?? 0,
        revenue,
    };
};

export const fetchSalesTrend = async () => {
    const { data, error } = await supabase.rpc("monthly_sales_trend");
    if (error) {
        console.warn("monthly_sales_trend function missing, falling back to client aggregation.");
        return [];
    }
    return data;
};

export const fetchBestSellers = async limit => {
    const { data, error } = await supabase
        .from("order_item")
        .select(
            `
            product_id,
            quantity,
            product:product_id (
                id,
                title,
                price,
                product_image ( image_url, id )
            )
        `,
        )
        .limit(100);
    ensureSuccess("fetch best sellers", error);

    const aggregated = data.reduce((map, item) => {
        if (!item.product_id) return map;
        if (!map[item.product_id]) {
            map[item.product_id] = {
                product_id: item.product_id,
                title: item.product?.title,
                totalSold: 0,
                revenue: 0,
                image: item.product?.product_image?.[0]?.image_url ?? null,
            };
        }
        map[item.product_id].totalSold += item.quantity;
        map[item.product_id].revenue += item.quantity * (item.product?.price ?? 0);
        return map;
    }, {});

    return Object.values(aggregated)
        .sort((a, b) => b.totalSold - a.totalSold)
        .slice(0, limit ?? 4);
};

export const fetchRecentOrders = async limit => {
    const { data, error } = await supabase
        .from("order")
        .select(
            `
            id,
            total_price,
            created_at,
            order_status:order_status_id ( id, code, label ),
            user:user_id ( id, name, email )
        `,
        )
        .order("created_at", { ascending: false })
        .limit(limit ?? 6);
    ensureSuccess("fetch recent orders", error);
    return data;
};
