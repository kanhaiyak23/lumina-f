import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { Eye } from "lucide-react";
import axios from "axios";
import CustomDataGrid from "../../components/common/CustomDataGrid/CustomDataGrid";
import { useSelector } from "react-redux";
const SubscriptionHistory = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const user = useSelector(state => state.auth.user);
    const userId = user ? user.id : null;

    const columns = [
        { field: "plan", headerName: "Plan", width: "150px" },
        { field: "type", headerName: "Type", width: "150px" },
        { field: "microgreens", headerName: "Microgreens", width: "200px" },
        { field: "size", headerName: "Size", width: "100px" },
        {
            field: "price",
            headerName: "Price",
            width: "100px",
            renderCell: row => `₹${row.price}`,
        },
        { field: "date", headerName: "Date", width: "200px" },
        {
            field: "actions",
            headerName: "Actions",
            width: "100px",
            renderCell: () => (
                <button className="text-black hover:text-gray-900">
                    <Eye size={22} />
                </button>
            ),
        },
    ];

    const fetchData = async pageNumber => {
        if (!userId) return;
        try {
            setLoading(true);
            const {
                data: subscriptions,
                error,
                count,
            } = await supabase
                .from("subscribers") // Name of the table storing subscriptions
                .select("subscription_id,subscription(*)") // Columns to fetch
                .eq("user_id", userId) // Filter by user ID
                .range((pageNumber - 1) * 10, pageNumber * 10 - 1); // Pagination

            if (error) throw error;

            // Transform the data
            const subscriptionData = subscriptions.map(subscription => ({
                id: subscription.subscription_id, // Assuming `id` is present
                plan: subscription.subscription.Plan,
                type: subscription.subscription.Type,
                microgreens: subscription.subscription.Microgreens,
                size: subscription.subscription.size,
                price: subscription.subscription.price,
                date: `${new Date(subscription.subscription.created_at).toLocaleDateString(
                    "en-GB",
                    {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    },
                )} To ${new Date(subscription.end_date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })}`,
            }));

            setData(subscriptionData);
            setTotalPages(Math.ceil(count / 10));
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(page);
    }, [page]);

    const handlePageChange = newPage => {
        setPage(newPage);
    };

    return (
        <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
            <div className="main-content-container mx-auto">
                <div className="mb-8">
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="flex items-center space-x-4">
                            <li>
                                <a href="#" className="text-gray-500 hover:text-gray-700">
                                    Home
                                </a>
                            </li>
                            <li>
                                <span className="text-gray-300">&gt;</span>
                            </li>
                            <li>
                                <span className="text-[#767676] font-normal">
                                    Subscriptions History
                                </span>
                            </li>
                        </ol>
                    </nav>
                </div>

                <div className="bg-white rounded-2xl shadow px-4 py-6">
                    <h1 className="text-xl text-[#171717] font-bold mb-6">Subscriptions History</h1>

                    <CustomDataGrid
                        keyId="id"
                        columns={columns}
                        rows={data}
                        isLoading={loading}
                        pageNumber={page}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default SubscriptionHistory;
