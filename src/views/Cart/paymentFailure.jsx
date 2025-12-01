import { useNavigate, useLocation } from "react-router-dom";

const PaymentFailed = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const reason = queryParams.get("reason") || "Unknown Error";
    const description = queryParams.get("description") || "No additional details available.";

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h1 className="text-2xl font-bold text-red-600">Payment Failed</h1>
                <p className="mt-2 text-gray-700">Reason: {reason}</p>
                <p className="mt-1 text-gray-500">{description}</p>

                <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-700"
                    onClick={() => navigate("/checkout")} // Redirect to retry payment
                >
                    Retry Payment
                </button>
            </div>
        </div>
    );
};

export default PaymentFailed;
