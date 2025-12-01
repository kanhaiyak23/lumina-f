import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { CheckCircle, Copy, ArrowLeft, Receipt } from "lucide-react";

const PaymentSuccess = () => {
    const query = new URLSearchParams(useLocation().search);
    const reference = query.get("reference");

    const copyToClipboard = () => {
        if (reference) {
            navigator.clipboard.writeText(reference);
        }
    };

    useEffect(() => {
        // Confetti effect on load
        const confetti = () => {
            const colors = ["#10B981", "#3B82F6", "#6366F1"];
            for (let i = 0; i < 100; i++) {
                createConfetti(colors[Math.floor(Math.random() * colors.length)]);
            }
        };

        const createConfetti = color => {
            const confetti = document.createElement("div");
            confetti.className = "absolute w-2 h-2 rounded-full";
            confetti.style.backgroundColor = color;
            confetti.style.left = Math.random() * 100 + "vw";
            confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
            document.getElementById("confetti-container")?.appendChild(confetti);
            setTimeout(() => confetti.remove(), 5000);
        };

        confetti();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div id="confetti-container" className="fixed inset-0 pointer-events-none" />

            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <div className="rounded-full bg-green-100 p-3">
                        <CheckCircle className="w-12 h-12 text-green-500" />
                    </div>
                </div>

                {/* Success Message */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
                    <p className="text-gray-600">
                        Thank you for your payment. Your transaction has been completed.
                    </p>
                </div>

                {/* Reference Number */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-600 mb-2">Reference Number</p>
                    <div className="flex items-center justify-between bg-white rounded-md p-3 border border-gray-200">
                        <span className="font-mono text-gray-800">{reference}</span>
                        <button
                            onClick={copyToClipboard}
                            className="text-blue-500 hover:text-blue-600 transition-colors"
                            title="Copy reference number"
                        >
                            {/* <Copy className="w-5 h-5" /> */}
                        </button>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4">
                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back Home
                    </Link>
                    <Link
                        to="/orders"
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        <Receipt className="w-4 h-4" />
                        View Order
                    </Link>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500" />
            </div>
        </div>
    );
};

export default PaymentSuccess;
