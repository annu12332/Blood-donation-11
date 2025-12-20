import { Outlet } from "react-router";
import Sidebar from "../components/dashboard/Sidebar";

const DashboardLayout = () => {
    return (
        <div className="relative min-h-screen md:flex">

            <Sidebar />


            <div className="flex-1 md:ml-64 bg-gray-100 min-h-screen">
                <div className="p-5">

                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;