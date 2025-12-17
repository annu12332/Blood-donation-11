import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaUser, FaPlusCircle, FaList } from "react-icons/fa";

const DashboardLayout = () => {
    
    const role = "donor"; 

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-blue-900 text-white p-5 space-y-4">
                <h2 className="text-2xl font-bold mb-10">Dashboard</h2>
                
                <nav className="flex flex-col gap-2">
                    <NavLink to="/dashboard" end className={({ isActive }) => isActive ? "bg-blue-700 p-2 rounded" : "p-2 hover:bg-blue-800 rounded flex items-center gap-2"}>
                        <FaHome /> Dashboard Home
                    </NavLink>
                    
                    <NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? "bg-blue-700 p-2 rounded" : "p-2 hover:bg-blue-800 rounded flex items-center gap-2"}>
                        <FaUser /> Profile
                    </NavLink>

                    
                    {role === "donor" && (
                        <>
                            <NavLink to="/dashboard/my-donation-requests" className="p-2 hover:bg-blue-800 rounded flex items-center gap-2">
                                <FaList /> My Requests
                            </NavLink>
                            <NavLink to="/dashboard/create-donation-request" className="p-2 hover:bg-blue-800 rounded flex items-center gap-2">
                                <FaPlusCircle /> Create Request
                            </NavLink>
                        </>
                    )}
                </nav>
            </div>

            
            <div className="flex-1 bg-gray-100 p-10">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;