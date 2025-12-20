import { useAuth } from "../provider/AuthProvider";
import useRole from "../hooks/UseRole";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";

const DashboardHome = () => {
    const { user } = useAuth();
    const [role] = useRole();
    const [recentRequests, setRecentRequests] = useState([]);


    useEffect(() => {
        if (user?.email && role === "donor") {
            axios
                .get(`http://localhost:3000/donation-requests/recent/${user.email}`)
                .then((res) => {
                    setRecentRequests(res.data);
                })
                .catch((err) => console.error("Error fetching recent requests:", err));
        }
    }, [user?.email, role]);

    return (
        <div className="space-y-8">

            <div className="bg-white p-8 rounded-2xl shadow-sm border-l-8 border-blue-600">
                <h1 className="text-3xl font-bold text-gray-800">
                    Welcome, <span className="text-blue-600">{user?.displayName}</span>! 👋
                </h1>
                <p className="text-gray-500 mt-2">
                    Your role: <span className="badge badge-secondary capitalize">{role}</span>
                </p>
            </div>


            {role === "donor" && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-700">Recent Donation Requests</h2>
                        {recentRequests.length > 0 && (
                            <Link to="/dashboard/my-donation-requests" className="text-blue-600 hover:underline font-medium">
                                View All Requests
                            </Link>
                        )}
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table w-full text-left">
                            <thead className="bg-gray-50 text-gray-600 font-semibold">
                                <tr>
                                    <th className="p-4">Recipient</th>
                                    <th className="p-4">Location</th>
                                    <th className="p-4">Date & Time</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentRequests.length > 0 ? (
                                    recentRequests.slice(0, 3).map((request) => (
                                        <tr key={request._id} className="border-t hover:bg-gray-50 transition">
                                            <td className="p-4 font-medium">{request.recipientName}</td>
                                            <td className="p-4 text-sm">
                                                {request.district}, {request.upazila}
                                            </td>
                                            <td className="p-4 text-sm">
                                                {request.donationDate} <br /> {request.donationTime}
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${request.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                                                        request.status === "inprogress" ? "bg-blue-100 text-blue-700" :
                                                            "bg-green-100 text-green-700"
                                                    }`}>
                                                    {request.status}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex gap-3">
                                                    <Link title="View" to={`/dashboard/request-details/${request._id}`}><FaEye className="text-blue-500 hover:scale-110" /></Link>
                                                    <Link title="Edit" to={`/dashboard/edit-request/${request._id}`}><FaEdit className="text-green-500 hover:scale-110" /></Link>
                                                    <button title="Delete"><FaTrashAlt className="text-red-500 hover:scale-110" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-10 text-gray-400">
                                            You haven't created any donation requests yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {(role === "admin" || role === "volunteer") && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-red-50 p-6 rounded-xl border border-red-100 text-center">
                        <h3 className="text-gray-600">Total Donors</h3>
                        <p className="text-4xl font-bold text-red-600">120</p>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 text-center">
                        <h3 className="text-gray-600">Total Requests</h3>
                        <p className="text-4xl font-bold text-blue-600">45</p>
                    </div>
                    <div className="bg-green-50 p-6 rounded-xl border border-green-100 text-center">
                        <h3 className="text-gray-600">Blood Collected (Bags)</h3>
                        <p className="text-4xl font-bold text-green-600">88</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardHome;