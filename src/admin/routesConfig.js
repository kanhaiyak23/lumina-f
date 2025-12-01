export const adminNavItems = [
    { label: "Dashboard", path: "/admin", icon: "dashboard" },
    { label: "All Products", path: "/admin/products", icon: "products" },
    { label: "Add Product", path: "/admin/products/new", icon: "add-product", hidden: true },
    { label: "Order List", path: "/admin/orders", icon: "orders" },
    { label: "Subscriptions", path: "/admin/subscriptions", icon: "subscriptions", disabled: true },
    { label: "Business Users", path: "/admin/business-users", icon: "users", disabled: true },
    { label: "Settings", path: "/admin/settings", icon: "settings", disabled: true },
];
