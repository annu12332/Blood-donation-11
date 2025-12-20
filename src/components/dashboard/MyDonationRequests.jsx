import { useEffect, useState } from "react";
import { useAuth } from "../../provider/AuthProvider";
import axios from "axios";
import { Link } from "react-router";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const MyDonationRequests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetchRequests();
    }
  }, [user?.email]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/donation-requests/${user.email}`);
      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

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
            Swal.fire("Deleted!", "Your request has been deleted.", "success");
            setRequests(requests.filter((req) => req._id !== id));
          }
        } catch (err) {
          Swal.fire("Error!", "Failed to delete.", "error");
        }
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Donation Requests</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-gray-50">
            <tr>
              <th>Recipient</th>
              <th>Location</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((request) => (
                <tr key={request._id} className="hover:bg-gray-50 border-t">
                  <td className="font-medium">{request.recipientName}</td>
                  <td className="text-sm">{request.district}, {request.upazila}</td>
                  <td className="text-sm">{request.donationDate} <br /> {request.donationTime}</td>
                  <td>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      request.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                      request.status === "inprogress" ? "bg-blue-100 text-blue-700" :
                      "bg-green-100 text-green-700"
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-4">
                      <Link title="View" to={`/dashboard/donation-details/${request._id}`}>
                        <FaEye className="text-blue-500 cursor-pointer hover:scale-120 transition" />
                      </Link>
                      <Link title="Edit" to={`/dashboard/edit-request/${request._id}`}>
                        <FaEdit className="text-green-500 cursor-pointer hover:scale-120 transition" />
                      </Link>
                      <button onClick={() => handleDelete(request._id)} title="Delete">
                        <FaTrashAlt className="text-red-500 cursor-pointer hover:scale-120 transition" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-400">
                  No donation requests found.
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