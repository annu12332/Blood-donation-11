import React, { useEffect, useState } from "react";
import { useAuth } from "../../provider/AuthProvider";
import axios from "axios";
import { Link } from "react-router";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import Swal from "sweetalert2"; 
import { toast } from "react-hot-toast";

const MyDonationRequests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");

  
  const fetchRequests = () => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/donation-requests/${user.email}`)
        .then((res) => setRequests(res.data))
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [user?.email]);

  
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`http://localhost:3000/donation-requests/${id}`);
          if (res.data.deletedCount > 0) {
            toast.success("Request deleted successfully!");
            fetchRequests(); 
          }
        } catch (err) {
          toast.error("Failed to delete.");
        }
      }
    });
  };

  
  const filteredRequests = filterStatus 
    ? requests.filter(req => req.status === filterStatus) 
    : requests;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">My Donation Requests</h2>
        
       
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-600">Filter by Status:</span>
          <select 
            className="select select-bordered select-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Recipient Name</th>
              <th className="p-4">Location</th>
              <th className="p-4">Date & Time</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <tr key={request._id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-4 font-semibold text-gray-700">{request.recipientName}</td>
                  <td className="p-4 text-sm">
                    {request.recipientDistrict}, {request.recipientUpazila}
                  </td>
                  <td className="p-4 text-sm">
                    {request.donationDate} | {request.donationTime}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      request.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                      request.status === "inprogress" ? "bg-blue-100 text-blue-700" :
                      request.status === "done" ? "bg-green-100 text-green-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-4 text-lg">
                      {/* View Button */}
                      <Link to={`/dashboard/request-details/${request._id}`} title="View Details">
                        <FaEye className="text-blue-500 hover:text-blue-700 cursor-pointer" />
                      </Link>
                      
                      {/* Edit Button */}
                      <Link to={`/dashboard/edit-request/${request._id}`} title="Edit Request">
                        <FaEdit className="text-green-500 hover:text-green-700 cursor-pointer" />
                      </Link>

                      {/* Delete Button */}
                      <button onClick={() => handleDelete(request._id)} title="Delete Request">
                        <FaTrashAlt className="text-red-500 hover:text-red-700 cursor-pointer" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-20 text-gray-400">
                  No donation requests found for this status.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyDonationRequests;