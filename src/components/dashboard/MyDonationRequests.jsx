import { useEffect, useState } from "react";
import { useAuth } from "../../provider/AuthProvider";
import axios from "axios";
import { Link } from "react-router";
import { toast } from "react-hot-toast";

const MyDonationRequests = () => {
    const { user } = useAuth();
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        if (user?.email) {
            axios.get(`http://localhost:5000/donation-requests/${user.email}`)
                .then(res => setRequests(res.data))
                .catch(err => console.error(err));
        }
    }, [user]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this?")) {
            const res = await axios.delete(`http://localhost:5000/donation-requests/${id}`);
            if (res.data.deletedCount > 0) {
                toast.success("Deleted successfully");
                setRequests(requests.filter(req => req._id !== id));
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
                    {requests.map(req => (
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
                                <Link to={`/donation-request-details/${req._id}`} className="btn btn-sm btn-ghost border-gray-300">View</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyDonationRequests;