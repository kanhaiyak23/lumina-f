import { Bell, Search, UserCircle2 } from "lucide-react";
import { useLocation } from "react-router-dom";

const AdminTopbar = () => {
    const location = useLocation();
    const pathname = location.pathname.replace("/admin", "") || "/";
    const titleMap = {
        "/": "Dashboard",
        "/products": "All Products",
        "/products/new": "Add Product",
        "/orders": "Order List",
    };

    const pageTitle = titleMap[pathname] || "Admin";

    return (
        <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
            <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Overview</p>
                <h1 className="text-2xl font-semibold text-gray-900">{pageTitle}</h1>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                    />
                    <input
                        type="search"
                        placeholder="Search"
                        className="bg-gray-50 rounded-full pl-10 pr-4 py-2 text-sm border border-transparent focus:border-emerald-200 focus:outline-none focus:bg-white w-64"
                    />
                </div>
                <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-emerald-600 hover:border-emerald-300 transition-colors">
                    <Bell size={18} />
                </button>
                <div className="flex items-center gap-2">
                    <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">Admin</p>
                        <p className="text-xs text-gray-500">Owner</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <UserCircle2 />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminTopbar;
