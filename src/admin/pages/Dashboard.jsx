import { useEffect, useMemo, useState } from "react";
import { Activity, ShoppingBag, CheckCircle, XCircle } from "lucide-react";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import {
    fetchBestSellers,
    fetchDashboardStats,
    fetchRecentOrders,
    fetchSalesTrend,
} from "../../Services/adminDashboard.service";
import { ORDER_STATUS } from "../../constants/status";

const Sparkline = ({ data = [] }) => {
    if (!data.length) {
        return <div className="text-sm text-gray-400">No sales trend data yet.</div>;
    }

    const width = 320;
    const height = 140;
    const maxValue = Math.max(...data.map(item => item.value), 1);
    const step = width / (data.length - 1 || 1);

    const path = data
        .map((item, index) => {
            const x = index * step;
            const y = height - (item.value / maxValue) * (height - 20);
            return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
        })
        .join(" ");

    return (
        <div className="w-full">
            <svg width={width} height={height} className="text-emerald-400">
                <path
                    d={path}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
            </svg>
            <div className="flex gap-4 text-xs text-gray-500 mt-2">
                {data.map(item => (
                    <div key={item.label}>
                        <p className="font-semibold text-gray-700">{item.label}</p>
                        <p className="text-gray-400">₹{item.value?.toLocaleString("en-IN")}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [trend, setTrend] = useState([]);
    const [bestSellers, setBestSellers] = useState([]);
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const [statRes, trendRes, sellers, orders] = await Promise.all([
                    fetchDashboardStats(),
                    fetchSalesTrend(),
                    fetchBestSellers(4),
                    fetchRecentOrders(6),
                ]);
                setStats(statRes);
                setTrend(
                    trendRes.length
                        ? trendRes
                        : [
                              { label: "Jul", value: 80 },
                              { label: "Aug", value: 120 },
                              { label: "Sep", value: 160 },
                              { label: "Oct", value: 210 },
                              { label: "Nov", value: 260 },
                              { label: "Dec", value: 400 },
                          ],
                );
                setBestSellers(sellers);
                setRecentOrders(orders);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const statCards = useMemo(
        () => [
            {
                label: "Total Orders",
                value: stats?.totalOrders ?? 0,
                accent: "emerald",
                icon: <ShoppingBag size={20} />,
                format: "number",
            },
            {
                label: "Active Orders",
                value: stats?.activeOrders ?? 0,
                accent: "indigo",
                icon: <Activity size={20} />,
                format: "number",
            },
            {
                label: "Completed Orders",
                value: stats?.completedOrders ?? 0,
                accent: "emerald",
                icon: <CheckCircle size={20} />,
                format: "number",
            },
            {
                label: "Canceled Orders",
                value: stats?.cancelledOrders ?? 0,
                accent: "rose",
                icon: <XCircle size={20} />,
                format: "number",
            },
        ],
        [stats],
    );

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {statCards.map(card => (
                    <StatCard key={card.label} {...card} />
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl border border-gray-100 p-6 xl:col-span-2">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <p className="text-sm text-gray-500">Sale Graph</p>
                            <h3 className="text-xl font-semibold text-gray-900">Monthly</h3>
                        </div>
                        <div className="flex gap-2 text-xs font-semibold bg-gray-50 rounded-full p-1">
                            <button className="px-3 py-1 rounded-full text-gray-400">Weekly</button>
                            <button className="px-3 py-1 rounded-full bg-white shadow text-emerald-600">
                                Monthly
                            </button>
                            <button className="px-3 py-1 rounded-full text-gray-400">Yearly</button>
                        </div>
                    </div>
                    <Sparkline data={trend} />
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Best Sellers</h3>
                        <span className="text-xs text-gray-400">Top {bestSellers.length}</span>
                    </div>
                    <div className="space-y-4">
                        {bestSellers.map(item => (
                            <div key={item.product_id} className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-emerald-50 overflow-hidden">
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-emerald-600 text-sm">
                                            {item.title?.slice(0, 2).toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-gray-900">
                                        {item.title}
                                    </p>
                                    <p className="text-xs text-gray-500">{item.totalSold} sales</p>
                                </div>
                                <span className="text-sm font-semibold text-gray-900">
                                    ₹{item.revenue.toLocaleString("en-IN")}
                                </span>
                            </div>
                        ))}
                        {!bestSellers.length && (
                            <p className="text-sm text-gray-400">
                                No sales yet. Once orders arrive, top products will appear here.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                    <p className="text-xs text-gray-400">Last 6 orders</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left">
                        <thead>
                            <tr className="text-xs text-gray-400 uppercase tracking-wide">
                                <th className="py-3">Order ID</th>
                                <th className="py-3">Customer Name</th>
                                <th className="py-3">Date</th>
                                <th className="py-3">Status</th>
                                <th className="py-3 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                            {recentOrders.map(order => (
                                <tr key={order.id} className="text-gray-700">
                                    <td className="py-3 font-semibold">#{order.id.slice(0, 6)}</td>
                                    <td className="py-3">{order.user?.name}</td>
                                    <td className="py-3 text-gray-500">
                                        {new Date(order.created_at).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </td>
                                    <td className="py-3">
                                        <StatusBadge
                                            status={order.order_status ?? ORDER_STATUS.PENDING}
                                        />
                                    </td>
                                    <td className="py-3 text-right font-semibold">
                                        ₹{Number(order.total_price ?? 0).toLocaleString("en-IN")}
                                    </td>
                                </tr>
                            ))}
                            {!recentOrders.length && !loading && (
                                <tr>
                                    <td colSpan={5} className="py-6 text-center text-gray-400">
                                        No orders yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
