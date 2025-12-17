import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../../provider/AuthProvider";
import useRole from "../../hooks/UseRole"; // এটি আমরা আগের ধাপে আলোচনা করেছি
import { 
  FaUser, FaHome, FaSignOutAlt, FaBars, 
  FaTimes, FaPlusCircle, FaList, FaUsers, FaTasks 
} from "react-icons/fa";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [role] = useRole(); // ডাটাবেজ থেকে আসা রোল (donor, volunteer, admin)
  const [isActive, setActive] = useState(false);
  const navigate = useNavigate();

  // মোবাইল মেনু ওপেন/ক্লোজ করার ফাংশন
  const handleToggle = () => {
    setActive(!isActive);
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/");
      });
  };

  return (
    <>
      {/* ১. ছোট স্ক্রিনের জন্য টপ বার (মোবাইল ভিউ) */}
      <div className="bg-blue-900 text-white flex justify-between md:hidden p-4 items-center">
        <div className="font-bold text-xl">BloodDonation</div>
        <button
          onClick={handleToggle}
          className="p-2 focus:outline-none hover:bg-blue-800 rounded-lg"
        >
          {isActive ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* ২. মেইন সাইডবার কন্টেইনার */}
      <div
        className={`z-20 md:fixed flex flex-col justify-between overflow-x-hidden bg-blue-900 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition duration-300 ease-in-out`}
      >
        <div>
          {/* লোগো বা টাইটেল */}
          <div className="text-2xl font-bold text-center text-white mb-8 border-b border-blue-700 pb-4">
            Dashboard
          </div>

          <nav className="flex flex-col gap-2">
            {/* Common Links (সবাই দেখতে পাবে) */}
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `flex items-center px-4 py-2 transition-colors duration-300 rounded-lg text-white ${
                  isActive ? "bg-blue-700 font-bold" : "hover:bg-blue-800"
                }`
              }
            >
              <FaHome className="w-5 h-5" />
              <span className="mx-4 font-medium">Dashboard Home</span>
            </NavLink>

            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 transition-colors duration-300 rounded-lg text-white ${
                  isActive ? "bg-blue-700 font-bold" : "hover:bg-blue-800"
                }`
              }
            >
              <FaUser className="w-5 h-5" />
              <span className="mx-4 font-medium">My Profile</span>
            </NavLink>

            {/* --- Donor মেনু --- */}
            {role === "donor" && (
              <>
                <NavLink
                  to="/dashboard/my-donation-requests"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 transition-colors duration-300 rounded-lg text-white ${
                      isActive ? "bg-blue-700 font-bold" : "hover:bg-blue-800"
                    }`
                  }
                >
                  <FaList className="w-5 h-5" />
                  <span className="mx-4 font-medium">My Donation Requests</span>
                </NavLink>

                <NavLink
                  to="/dashboard/create-donation-request"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 transition-colors duration-300 rounded-lg text-white ${
                      isActive ? "bg-blue-700 font-bold" : "hover:bg-blue-800"
                    }`
                  }
                >
                  <FaPlusCircle className="w-5 h-5" />
                  <span className="mx-4 font-medium">Create Request</span>
                </NavLink>
              </>
            )}

            {/* --- Admin/Volunteer মেনু (Shared) --- */}
            {(role === "admin" || role === "volunteer") && (
              <>
                <NavLink
                  to="/dashboard/all-blood-donation-request"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 transition-colors duration-300 rounded-lg text-white ${
                      isActive ? "bg-blue-700 font-bold" : "hover:bg-blue-800"
                    }`
                  }
                >
                  <FaTasks className="w-5 h-5" />
                  <span className="mx-4 font-medium">All Requests</span>
                </NavLink>
                <NavLink
                  to="/dashboard/content-management"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 transition-colors duration-300 rounded-lg text-white ${
                      isActive ? "bg-blue-700 font-bold" : "hover:bg-blue-800"
                    }`
                  }
                >
                  <FaTasks className="w-5 h-5" />
                  <span className="mx-4 font-medium">Content Management</span>
                </NavLink>
              </>
            )}

            {/* --- শুধুমাত্র Admin মেনু --- */}
            {role === "admin" && (
              <NavLink
                to="/dashboard/all-users"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 transition-colors duration-300 rounded-lg text-white ${
                    isActive ? "bg-blue-700 font-bold" : "hover:bg-blue-800"
                  }`
                }
              >
                <FaUsers className="w-5 h-5" />
                <span className="mx-4 font-medium">All Users</span>
              </NavLink>
            )}
          </nav>
        </div>

        {/* বটম সেকশন: লগআউট এবং হোম */}
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
            className="flex w-full items-center px-4 py-2 mt-2 text-red-300 hover:bg-red-900 transition-colors duration-300 rounded-lg font-bold"
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