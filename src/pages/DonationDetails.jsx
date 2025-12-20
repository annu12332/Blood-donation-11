import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import { useAuth } from '../provider/AuthProvider';
import { toast } from 'react-hot-toast';

const DonationDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [request, setRequest] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3000/donation-request-details/${id}`)
            .then(res => setRequest(res.data));
    }, [id]);

    const handleConfirmDonate = async () => {
        const donationInfo = {
            donorName: user?.displayName,
            donorEmail: user?.email,
            status: 'inprogress'
        };

        const res = await axios.patch(`http://localhost:3000/donation-requests/donate/${id}`, donationInfo);
        if (res.data.modifiedCount > 0) {
            toast.success("Thank you for your donation! Status updated to In-Progress.");
            navigate('/donation-requests');
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <div className="bg-white p-8 rounded-2xl shadow-xl border">
                <h2 className="text-3xl font-bold text-red-600 mb-6 border-b pb-4">Recipient Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                    <p><strong>Name:</strong> {request.recipientName}</p>
                    <p><strong>Hospital:</strong> {request.hospitalName}</p>
                    <p><strong>Address:</strong> {request.fullAddress}</p>
                    <p><strong>District:</strong> {request.recipientDistrict}</p>
                    <p><strong>Upazila:</strong> {request.recipientUpazila}</p>
                    <p><strong>Date:</strong> {request.donationDate}</p>
                    <p><strong>Time:</strong> {request.donationTime}</p>
                    <p className="md:col-span-2"><strong>Message:</strong> {request.requestMessage}</p>
                </div>

                <div className="mt-10">
                    
                    <button 
                        onClick={() => document.getElementById('my_modal_confirm').showModal()}
                        className="btn btn-error text-white w-full text-lg"
                    >
                        Donate Now
                    </button>
                </div>
            </div>

            
            <dialog id="my_modal_confirm" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Confirm Donation</h3>
                    <p className="py-4">Are you sure you want to donate to <strong>{request.recipientName}</strong>?</p>
                    <div className="space-y-2">
                        <p><strong>Your Name:</strong> {user?.displayName}</p>
                        <p><strong>Your Email:</strong> {user?.email}</p>
                    </div>
                    <div className="modal-action">
                        <button onClick={handleConfirmDonate} className="btn btn-success text-white">Yes, Confirm</button>
                        <form method="dialog">
                            <button className="btn">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default DonationDetails;