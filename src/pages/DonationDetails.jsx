import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useAuth } from "../provider/AuthProvider";
import { toast } from "react-hot-toast";

const DonationDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [request, setRequest] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/donation-request-details/${id}`)
            .then(res => setRequest(res.data));
    }, [id]);

    const handleDonate = async () => {
        const donationInfo = {
            donorName: user?.displayName,
            donorEmail: user?.email,
            status: 'inprogress'
        };

        try {
            const res = await axios.patch(`http://localhost:5000/donation-requests/donate/${id}`, donationInfo);
            if (res.data.modifiedCount > 0) {
                toast.success("Thanks for your donation intent!");
                // পেজ রিফ্রেশ বা ডাটা আপডেট
                setRequest({...request, ...donationInfo});
            }
        } catch (error) {
            toast.error("Error updating status");
        }
    };

    if (!request) return <div>Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto my-10 p-6 bg-white shadow-xl rounded-lg">
            <h2 className="text-3xl font-bold text-red-600 mb-4">{request.recipientName} Needs Blood</h2>
            <div className="space-y-3 text-lg">
                <p><strong>Blood Group:</strong> {request.bloodGroup}</p>
                <p><strong>Location:</strong> {request.district}, {request.upazila}</p>
                <p><strong>Hospital:</strong> {request.hospitalName}</p>
                <p><strong>Address:</strong> {request.fullAddress}</p>
                <p><strong>Time:</strong> {request.donationDate} at {request.donationTime}</p>
                <p className="italic text-gray-600">"{request.requestMessage}"</p>
            </div>

            {/* Donate Button - শুধু পেন্ডিং থাকলে দেখাবে */}
            {request.status === 'pending' && (
                <button 
                    onClick={handleDonate} 
                    className="btn btn-error w-full mt-6 text-white"
                >
                    Donate Now
                </button>
            )}
        </div>
    );
};

export default DonationDetails;