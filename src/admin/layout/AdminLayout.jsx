import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopbar";

const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-[#F5FBF7] flex">
            <AdminSidebar />
            <div className="flex-1 flex flex-col">
                <AdminTopbar />
                <main className="flex-1 overflow-y-auto px-8 py-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
