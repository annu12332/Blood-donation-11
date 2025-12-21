import { useAuth } from "../provider/AuthProvider";
import useRole from "../hooks/UseRole";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { FaEye, FaEdit, FaTrashAlt, FaUsers, FaHandHoldingHeart, FaCheckCircle } from "react-icons/fa";

const DashboardHome = () => {
    const { user } = useAuth();
    const [role] = useRole();
    const [recentRequests, setRecentRequests] = useState([]);
    // স্ট্যাটাস ডাটা রাখার জন্য স্টেট
    const [stats, setStats] = useState({ users: 0, requests: 0, doneDonations: 0 });

    useEffect(() => {
        // ১. ডোনারের জন্য রিসেন্ট রিকোয়েস্ট আনা
        if (user?.email && role === "donor") {
            axios
                .get(`http://localhost:5000/donation-requests/recent/${user.email}`)
                .then((res) => setRecentRequests(res.data))
                .catch((err) => console.error("Error fetching recent requests:", err));
        }

        // ২. এডমিন বা ভলান্টিয়ারের জন্য ডাইনামিক স্ট্যাটাস আনা
        if (role === "admin" || role === "volunteer") {
            axios
                .get('http://localhost:5000/admin-stats')
                .then((res) => setStats(res.data))
                .catch((err) => console.error("Error fetching stats:", err));
        }
    }, [user?.email, role]);

    return (
        <div className="space-y-8 p-4">
            {/* Welcome Header */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border-l-8 border-blue-600">
                <h1 className="text-3xl font-bold text-gray-800">
                    Welcome, <span className="text-blue-600">{user?.displayName}</span>! 👋
                </h1>
                <p className="text-gray-500 mt-2">
                    Your role: <span className="badge badge-secondary capitalize">{role}</span>
                </p>
            </div>

            {/* Donor View: Recent Requests Table */}
            {role === "donor" && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-700">Recent Donation Requests</h2>
                        {recentRequests.length > 0 && (
                            <Link to="/dashboard/my-donation-requests" className="text-blue-600 hover:underline font-medium text-sm">
                                View All Requests
                            </Link>
                        )}
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className="bg-gray-50">
                                <tr className="text-gray-600">
                                    <th className="p-4">Recipient</th>
                                    <th>Location</th>
                                    <th>Date & Time</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentRequests.length > 0 ? (
                                    recentRequests.map((request) => (
                                        <tr key={request._id} className="border-t hover:bg-gray-50 transition">
                                            <td className="p-4 font-bold">{request.recipientName}</td>
                                            <td className="text-sm">{request.district}, {request.upazila}</td>
                                            <td className="text-sm">{request.donationDate} <br /> {request.donationTime}</td>
                                            <td>
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                                                    request.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                                                    request.status === "inprogress" ? "bg-blue-100 text-blue-700" :
                                                    "bg-green-100 text-green-700"
                                                }`}>
                                                    {request.status}
                                                </span>
                                            </td>
                                            <td className="flex gap-4 p-4 text-lg">
                                                <Link to={`/dashboard/request-details/${request._id}`}><FaEye className="text-blue-500 hover:scale-125 transition" /></Link>
                                                <Link to={`/dashboard/edit-request/${request._id}`}><FaEdit className="text-green-500 hover:scale-125 transition" /></Link>
                                                <button><FaTrashAlt className="text-red-500 hover:scale-125 transition" /></button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-10 text-gray-400">No requests found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Admin/Volunteer View: Dynamic Stats Cards */}
            {(role === "admin" || role === "volunteer") && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-8 rounded-2xl border border-red-100 shadow-sm flex items-center justify-between">
                        <div>
                            <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider">Total Donors</h3>
                            <p className="text-4xl font-black text-red-600 mt-1">{stats.users}</p>
                        </div>
                        <FaUsers className="text-5xl text-red-100" />
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-blue-100 shadow-sm flex items-center justify-between">
                        <div>
                            <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider">Total Requests</h3>
                            <p className="text-4xl font-black text-blue-600 mt-1">{stats.requests}</p>
                        </div>
                        <FaHandHoldingHeart className="text-5xl text-blue-100" />
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-green-100 shadow-sm flex items-center justify-between">
                        <div>
                            <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider">Blood Collected</h3>
                            <p className="text-4xl font-black text-green-600 mt-1">{stats.doneDonations}</p>
                        </div>
                        <FaCheckCircle className="text-5xl text-green-100" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardHome;