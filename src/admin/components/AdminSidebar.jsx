import { NavLink } from "react-router-dom";
import { Home, Package, ShoppingBag, Users, Settings, ClipboardList } from "lucide-react";
import { adminNavItems } from "../routesConfig";

const iconMap = {
    dashboard: Home,
    products: Package,
    "add-product": Package,
    orders: ShoppingBag,
    subscriptions: ClipboardList,
    "business-users": Users,
    settings: Settings,
};

const AdminSidebar = () => {
    return (
        <aside className="w-64 bg-white border-r border-gray-100 min-h-screen p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                    H
                </div>
                <div>
                    <p className="text-base font-semibold text-gray-900">Healthy Harvest</p>
                    <p className="text-xs text-gray-500">Admin Panel</p>
                </div>
            </div>

            <nav className="flex flex-col gap-1 flex-1">
                {adminNavItems
                    .filter(nav => !nav.hidden)
                    .map(item => {
                        const Icon = iconMap[item.icon] || Home;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === "/admin"}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                                        isActive
                                            ? "bg-emerald-500 text-white"
                                            : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
                                    } ${item.disabled ? "opacity-60 pointer-events-none" : ""}`
                                }
                            >
                                <Icon size={18} />
                                {item.label}
                            </NavLink>
                        );
                    })}
            </nav>

            <div className="mt-6 text-xs text-gray-400">
                © {new Date().getFullYear()} Healthy Harvest
            </div>
        </aside>
    );
};

export default AdminSidebar;
