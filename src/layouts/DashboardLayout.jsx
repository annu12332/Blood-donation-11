import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../provider/AuthProvider";
import { FaUser, FaHome, FaSignOutAlt, FaBars, FaTimes, FaPlusCircle, FaList } from "react-icons/fa";

const Sidebar = () => {
  const { logOut, user } = useAuth();
  const [isActive, setActive] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => setActive(!isActive);

  const handleLogOut = () => {
    logOut();
    navigate("/");
  };

  return (
    <>
      {/* Mobile Screen Navbar */}
      <div className="bg-blue-900 text-white flex justify-between md:hidden p-4">
        <div className="font-bold">Blood Donation</div>
        <button onClick={handleToggle} className="p-2 focus:outline-none">
          {isActive ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar Content */}
      <div className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-blue-900 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && "-translate-x-full"} md:translate-x-0 transition duration-200 ease-in-out`}>
        <div>
          <h2 className="text-2xl font-bold text-center text-white mb-8 border-b pb-4">Dashboard</h2>
          
          <nav>
            <NavLink to="/dashboard" end className={({ isActive }) => `flex items-center px-4 py-2 mt-2 transition-colors duration-300 transform rounded-lg hover:bg-blue-700 text-white ${isActive ? "bg-blue-700" : ""}`}>
              <FaHome className="w-5 h-5" />
              <span className="mx-4 font-medium">Welcome Home</span>
            </NavLink>

            <NavLink to="/dashboard/profile" className={({ isActive }) => `flex items-center px-4 py-2 mt-2 transition-colors duration-300 transform rounded-lg hover:bg-blue-700 text-white ${isActive ? "bg-blue-700" : ""}`}>
              <FaUser className="w-5 h-5" />
              <span className="mx-4 font-medium">Profile</span>
            </NavLink>

            {/* Donor Routes (এগুলো পরে ডাইনামিক করব) */}
            <NavLink to="/dashboard/my-donation-requests" className="flex items-center px-4 py-2 mt-2 text-white hover:bg-blue-700 rounded-lg">
              <FaList className="w-5 h-5" />
              <span className="mx-4 font-medium">My Requests</span>
            </NavLink>
          </nav>
        </div>

        <div>
          <hr className="border-blue-700" />
          <button onClick={handleLogOut} className="flex w-full items-center px-4 py-2 mt-5 text-red-300 hover:bg-red-800 transition-colors duration-300 rounded-lg">
            <FaSignOutAlt className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;