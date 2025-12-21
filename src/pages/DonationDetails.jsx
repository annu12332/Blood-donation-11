import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useAuth } from "../provider/AuthProvider"; // { useAuth } কার্লি ব্রেস যোগ করা হয়েছে
import Swal from "sweetalert2";

const DonationDetails = () => {
    const { id } = useParams();
    const { user } = useAuth(); // এখন এটি সঠিকভাবে কাজ করবে
    const [donation, setDonation] = useState(null);

    useEffect(() => {
        // API কল করার সময় আইডি ভ্যালিড কিনা তা নিশ্চিত হওয়া ভালো
        if (id) {
            axios.get(`http://localhost:5000/donation-request-details/${id}`)
                .then(res => setDonation(res.data))
                .catch(err => console.error("Error fetching details:", err));
        }
    }, [id]);

    const handleDonate = async (e) => {
        e.preventDefault();
        
        // লগইন করা ইউজার না থাকলে ডোনেট করতে বাধা দিন
        if (!user) {
            return Swal.fire("Error", "Please login to donate", "error");
        }

        const donationUpdate = {
            donorName: user?.displayName,
            donorEmail: user?.email,
            status: 'inprogress'
        };

        try {
            const res = await axios.patch(`http://localhost:5000/donation-requests/donate/${id}`, donationUpdate);
            if (res.data.modifiedCount > 0) {
                Swal.fire("Success!", "Thank you for volunteering to donate!", "success");
                setDonation({ ...donation, ...donationUpdate });
                document.getElementById('donate-modal').close();
            }
        } catch (error) {
            Swal.fire("Error", "Something went wrong while updating status", "error");
        }
    };

    if (!donation) return <div className="text-center py-20 text-2xl font-semibold">Loading Donation Details...</div>;

    return (
        <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-xl rounded-2xl border border-gray-100">
            
            <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Donation Request Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                <p><strong>Recipient Name:</strong> {donation.recipientName}</p>
                <p><strong>Blood Group:</strong> <span className="badge badge-error text-white font-bold p-3">{donation.bloodGroup}</span></p>
                <p><strong>District:</strong> {donation.district}</p>
                <p><strong>Upazila:</strong> {donation.upazila}</p>
                <p><strong>Hospital:</strong> {donation.hospitalName}</p>
                <p><strong>Full Address:</strong> {donation.fullAddress}</p>
                <p><strong>Date:</strong> {donation.donationDate}</p>
                <p><strong>Time:</strong> {donation.donationTime}</p>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg border-l-4 border-red-500">
                <p className="font-medium text-gray-700 italic">" {donation.requestMessage || 'No message provided.'} "</p>
            </div>

            <div className="mt-10 text-center">
                {donation.status === 'pending' ? (
                    <button 
                        onClick={() => document.getElementById('donate-modal').showModal()}
                        className="btn btn-error text-white px-10 hover:bg-red-700 transition-colors"
                    >
                        Donate Now
                    </button>
                ) : (
                    <div className="badge badge-lg badge-outline badge-info p-6 font-semibold">
                        Status: Already In Progress by {donation.donorName || 'a donor'}
                    </div>
                )}
            </div>

            {/* Modal - DaisyUI */}
            <dialog id="donate-modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-xl mb-4 text-center text-red-600">Confirm Your Donation</h3>
                    <form onSubmit={handleDonate} className="space-y-4">
                        <div className="form-control">
                            <label className="label text-sm font-semibold text-gray-600">Your Name</label>
                            <input type="text" defaultValue={user?.displayName} readOnly className="input input-bordered bg-gray-100" />
                        </div>
                        <div className="form-control">
                            <label className="label text-sm font-semibold text-gray-600">Your Email</label>
                            <input type="email" defaultValue={user?.email} readOnly className="input input-bordered bg-gray-100" />
                        </div>
                        <div className="modal-action flex justify-center mt-6">
                            <button type="submit" className="btn btn-success text-white w-full max-w-xs">Confirm Donation</button>
                        </div>
                    </form>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default DonationDetails;