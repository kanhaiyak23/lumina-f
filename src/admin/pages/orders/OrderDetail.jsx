import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import { fetchAdminOrderById, updateAdminOrderStatus } from "../../../Services/adminOrder.service";
import { ORDER_STATUS_OPTIONS, PAYMENT_STATUS_OPTIONS } from "../../../constants/status";
import StatusBadge from "../../components/StatusBadge";

const OrderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [statusId, setStatusId] = useState("");
    const [paymentStatusId, setPaymentStatusId] = useState("");
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);

    const loadOrder = async () => {
        try {
            setLoading(true);
            const data = await fetchAdminOrderById(id);
            setOrder(data);
            setStatusId(data.order_status_id);
            setPaymentStatusId(data.payment_status_id);
            setNote(data.admin_note ?? "");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrder();
    }, [id]);

    const handleSave = async () => {
        const toastId = toast.loading("Saving changes...");
        try {
            const updated = await updateAdminOrderStatus(id, {
                orderStatusId: statusId,
                paymentStatusId,
                admin_note: note,
            });
            setOrder(updated);
            toast.success("Order updated");
        } catch (error) {
            toast.error(error.message);
        } finally {
            toast.dismiss(toastId);
        }
    };

    if (!order && loading) {
        return <div className="text-gray-400">Loading...</div>;
    }

    if (!order) {
        return (
            <div className="text-gray-400">
                Order not found.{" "}
                <button className="text-emerald-600" onClick={() => navigate("/admin/orders")}>
                    Go back
                </button>
            </div>
        );
    }

    const subtotal = order.items.reduce(
        (sum, item) => sum + Number(item.price ?? 0) * Number(item.quantity ?? 1),
        0,
    );
    const tax = subtotal * 0.2;
    const total = subtotal + tax;

    return (
        <div className="space-y-6">
            <button
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600"
                onClick={() => navigate("/admin/orders")}
            >
                <ArrowLeft size={16} />
                Back to orders
            </button>

            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="text-sm text-gray-500">Order List &gt; Order Details</p>
                    <h2 className="text-2xl font-semibold text-gray-900">
                        Order ID: #{order.id.slice(0, 6)}
                    </h2>
                    <p className="text-sm text-gray-400">
                        {new Date(order.created_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </p>
                </div>
                <StatusBadge status={order.status || order.order_status} />
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="rounded-2xl bg-white border border-gray-100 p-4 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 font-semibold">
                        {order.user?.name?.[0]}
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Customer</p>
                        <p className="text-base font-semibold text-gray-900">{order.user?.name}</p>
                        <p className="text-xs text-gray-400">{order.user?.email}</p>
                        <p className="text-xs text-gray-400">{order.user?.mobile_number}</p>
                    </div>
                </div>
                <div className="rounded-2xl bg-white border border-gray-100 p-4">
                    <p className="text-sm text-gray-500">Order Info</p>
                    <p className="text-base font-semibold text-gray-900">Shipping: Standard</p>
                    <div className="mt-3 space-y-2 text-sm text-gray-600">
                        <p>Status: {order.status?.label}</p>
                        <p>
                            Payment ID:{" "}
                            {order.payment_transaction?.[0]?.razorpay_payment_id || "Pending"}
                        </p>
                    </div>
                </div>
                <div className="rounded-2xl bg-white border border-gray-100 p-4">
                    <p className="text-sm text-gray-500">Payment Info</p>
                    <p className="text-base font-semibold text-gray-900">Razorpay</p>
                    <div className="mt-3 flex gap-3">
                        <div className="flex-1">
                            <label className="text-xs text-gray-400">Order Status</label>
                            <select
                                value={statusId}
                                onChange={e => setStatusId(e.target.value)}
                                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm"
                            >
                                {ORDER_STATUS_OPTIONS.map(option => (
                                    <option key={option.id} value={option.id}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="text-xs text-gray-400">Payment Status</label>
                            <select
                                value={paymentStatusId}
                                onChange={e => setPaymentStatusId(e.target.value)}
                                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm"
                            >
                                {PAYMENT_STATUS_OPTIONS.map(option => (
                                    <option key={option.id} value={option.id}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl border border-gray-100 p-5 xl:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Products</h3>
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 rounded-xl bg-emerald-500 text-white text-sm font-semibold"
                            disabled={loading}
                        >
                            Save
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left">
                            <thead className="text-xs text-gray-400 uppercase tracking-wide">
                                <tr>
                                    <th className="py-3">Product Name</th>
                                    <th className="py-3">Order ID</th>
                                    <th className="py-3">Quantity</th>
                                    <th className="py-3 text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-100">
                                {order.items.map(item => (
                                    <tr key={item.id}>
                                        <td className="py-4 flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl bg-emerald-50 overflow-hidden">
                                                {item.product?.image ? (
                                                    <img
                                                        src={item.product.image}
                                                        alt={item.product?.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-emerald-600 text-xs">
                                                        {item.product?.title?.[0] || "P"}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {item.product?.title}
                                                </p>
                                                <p className="text-xs text-gray-400">Lorem Ipsum</p>
                                            </div>
                                        </td>
                                        <td className="py-4 text-gray-500">
                                            #{order.id.slice(0, 6)}
                                        </td>
                                        <td className="py-4 text-gray-500">{item.quantity}</td>
                                        <td className="py-4 text-right font-semibold">
                                            ₹
                                            {(
                                                Number(item.price) * Number(item.quantity)
                                            ).toLocaleString("en-IN")}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white border border-gray-100 rounded-2xl p-5">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Note</h3>
                        <textarea
                            value={note}
                            onChange={e => setNote(e.target.value)}
                            rows={5}
                            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                            placeholder="Type some notes"
                        />
                    </div>

                    <div className="bg-white border border-gray-100 rounded-2xl p-5">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
                        <div className="space-y-2 text-sm text-gray-500">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="font-semibold text-gray-900">
                                    ₹{subtotal.toLocaleString("en-IN")}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax (20%)</span>
                                <span className="font-semibold text-gray-900">
                                    ₹{tax.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Discount</span>
                                <span className="font-semibold text-gray-900">₹0</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="font-semibold text-gray-900">₹0</span>
                            </div>
                            <hr className="border-gray-100" />
                            <div className="flex justify-between text-base font-semibold text-gray-900">
                                <span>Total</span>
                                <span>₹{total.toLocaleString("en-IN")}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
