import { useEffect, useState } from "react";
import { useAuth } from "../../provider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure"; 
import { Link } from "react-router";
import { toast } from "react-hot-toast";

const MyDonationRequests = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure(); 
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/donation-requests/${user.email}`)
                .then(res => setRequests(res.data))
                .catch(err => {
                    console.error("Error fetching requests:", err);
                    toast.error("Failed to fetch requests");
                });
        }
    }, [user, axiosSecure]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this?")) {
            try {
                // এখানেও axiosSecure ব্যবহার করুন
                const res = await axiosSecure.delete(`/donation-requests/${id}`);
                if (res.data.deletedCount > 0) {
                    toast.success("Deleted successfully");
                    setRequests(requests.filter(req => req._id !== id));
                }
            } catch (error) {
                console.error("Delete error:", error);
                toast.error("Could not delete the request");
            }
        }
    };

    return (
        <div className="overflow-x-auto p-5">
            <h2 className="text-2xl font-bold mb-4">My Donation Requests</h2>
            <table className="table table-zebra w-full shadow-lg">
                <thead className="bg-red-500 text-white">
                    <tr>
                        <th>Recipient Name</th>
                        <th>Location</th>
                        <th>Date & Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.length > 0 ? (
                        requests.map(req => (
                            <tr key={req._id}>
                                <td>{req.recipientName}</td>
                                <td>{req.district}, {req.upazila}</td>
                                <td>{req.donationDate} at {req.donationTime}</td>
                                <td>
                                    <span className={`badge ${req.status === 'pending' ? 'badge-warning' : 'badge-success'}`}>
                                        {req.status}
                                    </span>
                                </td>
                                <td className="flex gap-2">
                                    <Link to={`/dashboard/edit-request/${req._id}`} className="btn btn-sm btn-info">Edit</Link>
                                    <button onClick={() => handleDelete(req._id)} className="btn btn-sm btn-error">Delete</button>
                                    <Link to={`/donation-details/${req._id}`} className="btn btn-sm btn-ghost border-gray-300">View</Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center py-4">No donation requests found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MyDonationRequests;