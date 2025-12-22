import { useAuth } from "../provider/AuthProvider";
import useRole from "../hooks/useRole";
import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure"; 
import { Link } from "react-router";
import { FaEye, FaEdit, FaTrashAlt, FaUsers, FaHandHoldingHeart, FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const DashboardHome = () => {
    const { user } = useAuth();
    const [role] = useRole();
    const axiosSecure = useAxiosSecure(); 
    const [recentRequests, setRecentRequests] = useState([]);
    const [stats, setStats] = useState({ users: 0, requests: 0, doneDonations: 0 });

    useEffect(() => {
        if (user?.email && role === "donor") {
            axiosSecure
                .get(`/donation-requests/recent/${user.email}`)
                .then((res) => setRecentRequests(res.data))
                .catch((err) => console.error("Error fetching recent requests:", err));
        }

        if (role === "admin" || role === "volunteer") {
            axiosSecure
                .get('/admin-stats')
                .then((res) => setStats(res.data))
                .catch((err) => console.error("Error fetching stats:", err));
        }
    }, [user?.email, role, axiosSecure]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/donation-requests/${id}`);
                if (res.data.deletedCount > 0) {
                    setRecentRequests(recentRequests.filter(req => req._id !== id));
                    Swal.fire("Deleted!", "Request has been deleted.", "success");
                }
            }
        });
    };

    return (
        <div className="space-y-8 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-sm border-l-8 border-red-600">
                <h1 className="text-3xl font-bold text-gray-800">
                    Welcome, <span className="text-red-600">{user?.displayName}</span>! 👋
                </h1>
                <p className="text-gray-500 mt-2 font-medium">
                    Role: <span className="badge badge-error text-white capitalize px-4">{role}</span>
                </p>
            </div>

            {role === "donor" && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-700">My Recent Requests</h2>
                        <Link to="/dashboard/my-donation-requests" className="btn btn-sm btn-outline btn-error">
                            View All
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className="bg-gray-50 text-gray-700">
                                <tr>
                                    <th>Recipient</th>
                                    <th>Location</th>
                                    <th>Date & Time</th>
                                    <th>Status</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentRequests.length > 0 ? (
                                    recentRequests.map((request) => (
                                        <tr key={request._id} className="hover:bg-gray-50 transition">
                                            <td className="font-bold">{request.recipientName}</td>
                                            <td className="text-sm">{request.recipientDistrict}, {request.recipientUpazila}</td>
                                            <td className="text-sm">{request.donationDate} <br /> {request.donationTime}</td>
                                            <td>
                                                <span className={`badge badge-sm font-bold uppercase ${
                                                    request.status === "pending" ? "badge-warning" :
                                                    request.status === "inprogress" ? "badge-info" : "badge-success"
                                                }`}>
                                                    {request.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="flex justify-center gap-4 text-lg">
                                                    <Link title="View" to={`/donation-details/${request._id}`}><FaEye className="text-blue-500 hover:scale-110" /></Link>
                                                    <Link title="Edit" to={`/dashboard/update-donation-request/${request._id}`}><FaEdit className="text-green-500 hover:scale-110" /></Link>
                                                    <button title="Delete" onClick={() => handleDelete(request._id)}><FaTrashAlt className="text-red-500 hover:scale-110" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-10 text-gray-400 font-medium">No recent requests found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {(role === "admin" || role === "volunteer") && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-8 rounded-2xl border-b-4 border-red-500 shadow-md flex items-center justify-between">
                        <div>
                            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest">Total Donors</h3>
                            <p className="text-4xl font-black text-gray-800 mt-1">{stats.users}</p>
                        </div>
                        <FaUsers className="text-5xl text-red-100" />
                    </div>

                    <div className="bg-white p-8 rounded-2xl border-b-4 border-blue-500 shadow-md flex items-center justify-between">
                        <div>
                            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest">Total Requests</h3>
                            <p className="text-4xl font-black text-gray-800 mt-1">{stats.requests}</p>
                        </div>
                        <FaHandHoldingHeart className="text-5xl text-blue-100" />
                    </div>

                    <div className="bg-white p-8 rounded-2xl border-b-4 border-green-500 shadow-md flex items-center justify-between">
                        <div>
                            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest">Successful Donations</h3>
                            <p className="text-4xl font-black text-gray-800 mt-1">{stats.doneDonations}</p>
                        </div>
                        <FaCheckCircle className="text-5xl text-green-100" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardHome;