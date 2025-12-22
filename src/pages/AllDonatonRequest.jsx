import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure"; 
import { Link } from "react-router";
import { toast } from "react-hot-toast";

const AllDonationRequest = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get("/all-donation-requests")
            .then(res => {
                setRequests(res.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching requests:", error);
                setLoading(false);
            });
    }, [axiosSecure]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this request?")) {
            try {
                const res = await axiosSecure.delete(`/donation-requests/${id}`);
                if (res.data.deletedCount > 0) {
                    toast.success("Deleted successfully");
                    setRequests(requests.filter(req => req._id !== id));
                }
            } catch (error) {
                toast.error("Failed to delete");
            }
        }
    };

    if (loading) return <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg text-red-600"></span></div>;

    return (
        <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">All Donation Requests</h2>
                <div className="badge badge-error text-white p-4">Total: {requests.length}</div>
            </div>

            <div className="overflow-x-auto border rounded-lg">
                <table className="table table-zebra w-full">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th>Recipient</th>
                            <th>Location</th>
                            <th>Date & Time</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(request => (
                            <tr key={request._id}>
                                <td>
                                    <div className="font-bold">{request.recipientName}</div>
                                    <div className="text-sm opacity-50">Group: {request.bloodGroup}</div>
                                </td>
                                <td>
                                    {request.district}, {request.upazila}
                                </td>
                                <td>
                                    <div>{request.donationDate}</div>
                                    <div className="text-xs text-gray-500">{request.donationTime}</div>
                                </td>
                                <td>
                                    <span className={`badge badge-sm ${
                                        request.status === 'pending' ? 'badge-warning' : 
                                        request.status === 'inprogress' ? 'badge-info' : 'badge-success'
                                    }`}>
                                        {request.status}
                                    </span>
                                </td>
                                <td className="flex gap-2 justify-center">
                                    <Link 
                                        to={`/dashboard/edit-request/${request._id}`} 
                                        className="btn btn-square btn-ghost btn-sm text-info"
                                    >
                                        Edit
                                    </Link>
                                    <button 
                                        onClick={() => handleDelete(request._id)}
                                        className="btn btn-square btn-ghost btn-sm text-error"
                                    >
                                        Delete
                                    </button>
                                    <Link 
                                        to={`/donation-details/${request._id}`} 
                                        className="btn btn-ghost btn-sm"
                                    >
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {requests.length === 0 && (
                <p className="text-center py-10 text-gray-500">No requests found in the database.</p>
            )}
        </div>
    );
};

export default AllDonationRequest;