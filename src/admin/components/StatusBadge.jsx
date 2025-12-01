const StatusBadge = ({ status }) => {
    if (!status) return null;
    const className =
        status.tagColor ??
        (status.code === "pending"
            ? "bg-amber-100 text-amber-700 border-amber-200"
            : status.code === "shipped"
              ? "bg-blue-100 text-blue-700 border-blue-200"
              : status.code === "delivered"
                ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                : "bg-rose-100 text-rose-700 border-rose-200");

    return (
        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${className}`}>
            {status.label}
        </span>
    );
};

export default StatusBadge;
