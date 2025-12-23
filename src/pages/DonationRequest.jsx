import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import useAxiosPublic from '../hooks/useAxiosPublic';

const DonationRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('/pending-donation-requests')
            .then(res => {
                setRequests(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching requests:", err);
                setLoading(false);
            });
    }, [axiosPublic]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-bars loading-lg text-red-600"></span>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-4 text-gray-800 tracking-tight">
                    Available Donation Requests
                </h2>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    নিচের তালিকা থেকে জরুরি পেন্ডিং রিকোয়েস্টগুলো দেখে রক্ত দিয়ে প্রাণ বাঁচাতে এগিয়ে আসুন।
                </p>
                
                {requests.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
                        <h3 className="text-2xl font-semibold text-gray-400">
                            Currently, there are no pending blood requests.
                        </h3>
                        <p className="text-gray-500 mt-2">Check back later or share the portal with others.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {requests.map(request => (
                            <div key={request._id} className="card bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border-t-8 border-red-600">
                                <div className="card-body">
                                    <div className="flex justify-between items-start mb-4">
                                        <h2 className="card-title text-2xl font-bold text-gray-800">
                                            {request.recipientName}
                                        </h2>
                                        <div className="badge badge-error text-white p-3 font-bold text-lg shadow-sm">
                                            {request.bloodGroup}
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3 text-gray-700">
                                        <p className="flex items-center gap-2">
                                            <span className="font-bold text-red-600">📍</span> 
                                            <span className="font-semibold">Location:</span> {request.upazila}, {request.district}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span className="font-bold text-red-600">📅</span> 
                                            <span className="font-semibold">Date:</span> {request.donationDate}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span className="font-bold text-red-600">⏰</span> 
                                            <span className="font-semibold">Time:</span> {request.donationTime}
                                        </p>
                                        <div className="pt-2">
                                            <span className="text-xs uppercase font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded">
                                                Status: {request.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="card-actions mt-6">
                                        <Link 
                                            to={`/donation-details/${request._id}`} 
                                            className="btn btn-error w-full text-white font-bold shadow-md hover:bg-red-700 transition-colors"
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