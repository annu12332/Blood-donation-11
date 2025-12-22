import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../../provider/AuthProvider";
import useRole from "../../hooks/useRole";
import {
    FaUser, FaHome, FaSignOutAlt, FaBars,
    FaTimes, FaPlusCircle, FaList, FaUsers, FaTasks, FaWallet,
    FaHandHoldingHeart, FaHistory
} from "react-icons/fa";

const Sidebar = () => {
    const { logout } = useAuth();
    const [role] = useRole();
    const [isActive, setActive] = useState(false);
    const navigate = useNavigate();

    const handleToggle = () => {
        setActive(!isActive);
    };

    const handleLogOut = () => {
        logout()
            .then(() => {
                navigate("/");
            })
            .catch(err => console.log(err));
    };

    const navLinkClass = ({ isActive }) =>
        `flex items-center px-4 py-2 transition-colors duration-300 rounded-lg text-white ${isActive ? "bg-blue-700 font-bold" : "hover:bg-blue-800"
        }`;

    return (
        <>
            <div className="bg-blue-900 text-white flex justify-between md:hidden p-4 items-center shadow-lg">
                <div className="font-bold text-xl">BloodLife</div>
                <button
                    onClick={handleToggle}
                    className="p-2 focus:outline-none hover:bg-blue-800 rounded-lg transition-all"
                >
                    {isActive ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            <div
                className={`z-20 md:fixed flex flex-col justify-between overflow-x-hidden bg-blue-900 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0 transition duration-300 ease-in-out shadow-2xl`}
            >
                <div>
                    <div className="text-2xl font-bold text-center text-white mb-8 border-b border-blue-700 pb-4 tracking-wider">
                        Dashboard
                    </div>

                    <nav className="flex flex-col gap-2">
                        <NavLink to="/dashboard" end className={navLinkClass}>
                            <FaHome className="w-5 h-5" />
                            <span className="mx-4 font-medium">Home</span>
                        </NavLink>

                        <NavLink to="/dashboard/profile" className={navLinkClass}>
                            <FaUser className="w-5 h-5" />
                            <span className="mx-4 font-medium">My Profile</span>
                        </NavLink>

                        {role === "donor" && (
                            <>
                                <NavLink to="/dashboard/my-donation-requests" className={navLinkClass}>
                                    <FaList className="w-5 h-5" />
                                    <span className="mx-4 font-medium">My Requests</span>
                                </NavLink>

                                <NavLink to="/dashboard/create-donation-request" className={navLinkClass}>
                                    <FaPlusCircle className="w-5 h-5" />
                                    <span className="mx-4 font-medium">Create Request</span>
                                </NavLink>

                                <NavLink to="/dashboard/funding" className={navLinkClass}>
                                    <FaHandHoldingHeart className="w-5 h-5" />
                                    <span className="mx-4 font-medium">Give Funding</span>
                                </NavLink>

                                <NavLink to="/dashboard/my-funding" className={navLinkClass}>
                                    <FaHistory className="w-5 h-5" />
                                    <span className="mx-4 font-medium">Funding History</span>
                                </NavLink>
                            </>
                        )}

                        {(role === "admin" || role === "volunteer") && (
                            <>
                                <NavLink to="/dashboard/all-blood-donation-request" className={navLinkClass}>
                                    <FaTasks className="w-5 h-5" />
                                    <span className="mx-4 font-medium">All Requests</span>
                                </NavLink>
                                <NavLink to="/dashboard/content-management" className={navLinkClass}>
                                    <FaTasks className="w-5 h-5" />
                                    <span className="mx-4 font-medium">Content Management</span>
                                </NavLink>
                                
                                {role === 'admin' && (
                                    <NavLink to="/dashboard/all-funding" className={navLinkClass}>
                                        <FaWallet className="w-5 h-5" />
                                        <span className="mx-4 font-medium">All Funding</span>
                                    </NavLink>
                                )}
                            </>
                        )}

                        {role === "admin" && (
                            <NavLink to="/dashboard/all-users" className={navLinkClass}>
                                <FaUsers className="w-5 h-5" />
                                <span className="mx-4 font-medium">All Users</span>
                            </NavLink>
                        )}
                    </nav>
                </div>

                <div className="border-t border-blue-700 pt-4">
                    <NavLink
                        to="/"
                        className="flex items-center px-4 py-2 text-white hover:bg-blue-800 rounded-lg transition-colors"
                    >
                        <FaHome className="w-5 h-5" />
                        <span className="mx-4 font-medium">Back to Home</span>
                    </NavLink>

                    <button
                        onClick={handleLogOut}
                        className="flex w-full items-center px-4 py-2 mt-2 text-red-400 hover:bg-red-900/30 transition-colors duration-300 rounded-lg font-bold"
                    >
                        <FaSignOutAlt className="w-5 h-5" />
                        <span className="mx-4 font-medium">Logout</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;