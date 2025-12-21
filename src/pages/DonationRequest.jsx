import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

const DonationRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        axios.get('http://localhost:5000/all-donation-requests')
            .then(res => {
                setRequests(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="min-h-screen flex justify-center items-center">
            <span className="loading loading-bars loading-lg text-red-600"></span>
        </div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Blood Donation Requests</h2>
                <p className="text-center text-gray-600 mb-12">নিচের তালিকা থেকে আপনার গ্রুপের রক্তদাতা খুঁজে নিন অথবা রক্ত দিয়ে প্রাণ বাঁচান।</p>
                
                {requests.length === 0 ? (
                    <div className="text-center py-20">
                        <h3 className="text-2xl font-semibold text-gray-400">No pending requests at this moment.</h3>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {requests.map(request => (
                            <div key={request._id} className="card bg-white shadow-lg hover:shadow-2xl transition-shadow border-t-8 border-red-600">
                                <div className="card-body">
                                    <div className="flex justify-between items-start mb-4">
                                        <h2 className="card-title text-2xl font-bold text-gray-800">{request.recipientName}</h2>
                                        <div className="badge badge-error text-white p-3 font-bold text-lg">{request.bloodGroup}</div>
                                    </div>
                                    
                                    <div className="space-y-3 text-gray-700">
                                        <p className="flex items-center gap-2">
                                            <span className="font-bold">📍 Location:</span> {request.upazila}, {request.district}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span className="font-bold">📅 Date:</span> {request.donationDate}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span className="font-bold">⏰ Time:</span> {request.donationTime}
                                        </p>
                                    </div>

                                    <div className="card-actions mt-6">
                                        <Link 
                                            to={`/donation-details/${request._id}`} 
                                            className="btn btn-error w-full text-white font-bold"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DonationRequests;