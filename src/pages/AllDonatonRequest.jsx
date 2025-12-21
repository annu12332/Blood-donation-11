import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure"; 
import { Link } from "react-router";

const DonationRequests = () => {
    const [requests, setRequests] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get("/all-donation-requests")
            .then(res => {
                setRequests(res.data);
            })
            .catch(error => {
                console.error("Error fetching requests:", error);
            });
    }, [axiosSecure]);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Donation Requests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {requests.map(request => (
                    <div key={request._id} className="card bg-base-100 shadow-xl border">
                        <div className="card-body">
                            <h2 className="card-title text-red-600">{request.recipientName}</h2>
                            <p><strong>Blood Group:</strong> {request.bloodGroup}</p>
                            <p><strong>Location:</strong> {request.recipientDistrict}, {request.recipientUpazila}</p>
                            <p><strong>Date:</strong> {request.donationDate}</p>
                            <div className="card-actions justify-end mt-4">
                                <Link to={`/donation-details/${request._id}`} className="btn btn-error btn-sm text-white">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {requests.length === 0 && <p className="text-center text-gray-500">No donation requests available.</p>}
        </div>
    );
};

export default DonationRequests;