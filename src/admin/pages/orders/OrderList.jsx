import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Calendar, Eye, Filter, Search } from "lucide-react";
import { fetchAdminOrders } from "../../../Services/adminOrder.service";
import StatusBadge from "../../components/StatusBadge";
import { ORDER_STATUS_OPTIONS } from "../../../constants/status";

const OrderList = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [statusFilter, setStatusFilter] = useState("");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const pageSize = 10;

    const loadOrders = async (override = {}) => {
        try {
            setLoading(true);
            const params = {
                page,
                limit: pageSize,
                status: statusFilter || undefined,
                search: search || undefined,
                ...override,
            };
            const response = await fetchAdminOrders(params);
            setOrders(response.orders);
            setTotal(response.total);
            setPage(response.page);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders({ page: 1 });
    }, [statusFilter, search]);

    useEffect(() => {
        loadOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">Order List</h2>
                    <p className="text-sm text-gray-500">
                        Manage every order and keep customers updated.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 text-sm text-gray-600 border rounded-xl px-4 py-2">
                        <Calendar size={16} />
                        Last 30 days
                    </button>
                    <button className="flex items-center gap-2 text-sm text-gray-600 border rounded-xl px-4 py-2">
                        <Filter size={16} />
                        Filters
                    </button>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 bg-white border border-gray-100 rounded-2xl p-4">
                <div className="relative flex-1 min-w-[220px]">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                    />
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search"
                        className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-600"
                >
                    <option value="">Change Status</option>
                    {ORDER_STATUS_OPTIONS.map(option => (
                        <option key={option.id} value={option.id}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <button className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-600 flex items-center gap-2">
                    <Calendar size={16} />
                    Dec 11, 2024 - Jan 11, 2025
                </button>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left">
                        <thead className="bg-gray-50 text-xs text-gray-400 uppercase tracking-wide">
                            <tr>
                                <th className="px-6 py-3">Order ID</th>
                                <th className="px-6 py-3">Customer Name</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-100">
                            {orders.map(order => (
                                <tr key={order.id} className="text-gray-700">
                                    <td className="px-6 py-4 font-semibold">
                                        #{order.id.slice(0, 6)}
                                    </td>
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 text-xs font-semibold">
                                            {order.user?.name?.[0]}
                                        </div>
                                        <div>
                                            <p className="font-medium">{order.user?.name}</p>
                                            <p className="text-xs text-gray-400">
                                                {order.user?.email}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {new Date(order.created_at).toLocaleDateString("en-IN", {
                                            day: "short",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={order.status ?? order.order_status} />
                                    </td>
                                    <td className="px-6 py-4 font-semibold">
                                        ₹{Number(order.total_price ?? 0).toLocaleString("en-IN")}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => navigate(`/admin/orders/${order.id}`)}
                                            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600"
                                        >
                                            <Eye size={16} />
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {!orders.length && !loading && (
                                <tr>
                                    <td colSpan={6} className="py-8 text-center text-gray-400">
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {loading && <p className="text-center text-gray-400 text-sm py-4">Loading...</p>}

                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 text-sm text-gray-500">
                    <p>
                        {orders.length
                            ? `${(page - 1) * pageSize + 1}-${(page - 1) * pageSize + orders.length}`
                            : 0}{" "}
                        of {total}
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(prev => Math.max(1, prev - 1))}
                            className="px-3 py-1 rounded-lg border border-gray-200 disabled:opacity-40"
                        >
                            Prev
                        </button>
                        <span>
                            Page {page} / {totalPages}
                        </span>
                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                            className="px-3 py-1 rounded-lg border border-gray-200 disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderList;
