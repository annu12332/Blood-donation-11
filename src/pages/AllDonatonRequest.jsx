import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AllDonationRequests = () => {
    const [requests, setRequests] = useState([]);
    const [filter, setFilter] = useState(""); 

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get("http://localhost:5000/all-donation-requests");
            setRequests(res.data);
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    };

    // স্ট্যাটাস ফিল্টার করা ডাটা
    const filteredRequests = filter 
        ? requests.filter(req => req.status === filter) 
        : requests;

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h2 className="text-3xl font-extrabold text-gray-800">All Donation Requests</h2>
                
                {/* Filter Dropdown */}
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-600">Filter by Status:</span>
                    <select 
                        className="select select-bordered select-sm focus:ring-2 focus:ring-red-500"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="pending">Pending</option>
                        <option value="inprogress">In Progress</option>
                        <option value="done">Done</option>
                        <option value="canceled">Canceled</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto border rounded-lg">
                <table className="table table-zebra w-full">
                    <thead className="bg-red-50 text-red-700">
                        <tr>
                            <th>Recipient</th>
                            <th>Location</th>
                            <th>Date & Time</th>
                            <th>Status</th>
                            <th>Requester</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRequests.length > 0 ? (
                            filteredRequests.map((req) => (
                                <tr key={req._id} className="hover:bg-gray-50 transition-colors">
                                    <td>
                                        <div className="font-bold">{req.recipientName}</div>
                                        <div className="text-xs opacity-60">Group: {req.bloodGroup}</div>
                                    </td>
                                    <td className="text-sm">
                                        {req.recipientUpazila}, {req.recipientDistrict}
                                    </td>
                                    <td className="text-sm">
                                        {req.donationDate} <br /> 
                                        <span className="text-xs text-gray-500">{req.donationTime}</span>
                                    </td>
                                    <td>
                                        <span className={`badge badge-sm font-bold uppercase ${
                                            req.status === 'pending' ? 'badge-warning' : 
                                            req.status === 'inprogress' ? 'badge-info' : 
                                            req.status === 'done' ? 'badge-success' : 'badge-ghost'
                                        }`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="text-sm">
                                        <div className="font-medium">{req.requesterName}</div>
                                        <div className="text-xs text-gray-400">{req.requesterEmail}</div>
                                    </td>
                                    <td>
                                        <button className="btn btn-xs btn-outline btn-error">Manage</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-10 text-gray-400">No requests found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllDonationRequests;