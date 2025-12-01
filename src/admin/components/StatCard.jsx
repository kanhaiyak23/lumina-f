const formatValue = ({ value, format }) => {
    if (format === "currency") {
        return `₹${Number(value || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
    }
    return Number(value || 0).toLocaleString("en-IN");
};

const StatCard = ({ label, value, trend, icon, accent = "emerald", format = "currency" }) => {
    const trendLabel = trend?.label ?? "";
    const trendValue = trend?.value ?? "";

    const accentMap = {
        emerald: "bg-emerald-50 text-emerald-600",
        amber: "bg-amber-50 text-amber-600",
        rose: "bg-rose-50 text-rose-600",
        indigo: "bg-indigo-50 text-indigo-600",
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4 shadow-sm">
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{label}</p>
                <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${accentMap[accent]}`}
                >
                    {icon}
                </div>
            </div>
            <div>
                <p className="text-2xl font-semibold text-gray-900">
                    {formatValue({ value, format })}
                </p>
                {trendLabel && (
                    <p className="text-xs text-gray-400 mt-1">
                        {trendValue} {trendLabel}
                    </p>
                )}
            </div>
        </div>
    );
};

export default StatCard;
