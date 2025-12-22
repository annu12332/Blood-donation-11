import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useAuth } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const DonationDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: request = {}, refetch, isLoading } = useQuery({
        queryKey: ['donation-request', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donation-request-details/${id}`);
            return res.data;
        }
    });

    const handleConfirmDonate = async (e) => {
        e.preventDefault();

        const donorInfo = {
            donorName: user?.displayName,
            donorEmail: user?.email,
            status: 'inprogress'
        };

        try {
            const res = await axiosSecure.patch(`/donation-requests/status/${id}`, donorInfo);
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    title: "Success!",
                    text: "You have successfully volunteered for this request.",
                    icon: "success"
                });
                document.getElementById('donation_modal').close();
                refetch();
            }
        } catch (error) {
            Swal.fire("Error", "Something went wrong!", "error");
        }
    };

    if (isLoading) return <div className="text-center py-20"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
                <div className="bg-red-600 p-8 text-white text-center">
                    <h2 className="text-3xl font-bold uppercase tracking-wide">Donation Request Details</h2>
                </div>

                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <p className="text-lg"><strong>Recipient Name:</strong> {request.recipientName}</p>
                        <p className="text-lg"><strong>Blood Group:</strong> <span className="badge badge-error text-white font-bold p-3">{request.bloodGroup}</span></p>
                        <p className="text-lg"><strong>Location:</strong> {request.upazila}, {request.district}</p>
                        <p className="text-lg"><strong>Hospital:</strong> {request.hospitalName}</p>
                    </div>
                    <div className="space-y-4 border-l pl-8 border-gray-100">
                        <p className="text-lg"><strong>Date:</strong> {request.donationDate}</p>
                        <p className="text-lg"><strong>Time:</strong> {request.donationTime}</p>
                        <p className="text-lg"><strong>Full Address:</strong> {request.fullAddress}</p>
                        <p className="text-lg italic text-gray-500"><strong>Message:</strong> {request.requestMessage}</p>
                    </div>
                </div>

                <div className="p-8 bg-gray-50 flex justify-center">
                    {request.status === 'pending' ? (
                        <button 
                            onClick={() => document.getElementById('donation_modal').showModal()}
                            className="btn btn-error btn-lg px-12 text-white font-bold"
                        >
                            Donate Now
                        </button>
                    ) : (
                        <div className="alert alert-info">
                            <span>This request is currently <strong>{request.status}</strong> by {request.donorName}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Confirmation Modal */}
            <dialog id="donation_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-2xl text-red-600 text-center mb-6">Confirm Your Donation</h3>
                    <form onSubmit={handleConfirmDonate} className="space-y-4">
                        <div className="form-control">
                            <label className="label font-semibold">Donor Name</label>
                            <input type="text" defaultValue={user?.displayName} readOnly className="input input-bordered bg-gray-100" />
                        </div>
                        <div className="form-control">
                            <label className="label font-semibold">Donor Email</label>
                            <input type="text" defaultValue={user?.email} readOnly className="input input-bordered bg-gray-100" />
                        </div>
                        <div className="modal-action flex justify-center gap-4">
                            <button type="submit" className="btn btn-error text-white px-8">Confirm Donation</button>
                            <button type="button" onClick={() => document.getElementById('donation_modal').close()} className="btn">Cancel</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default DonationDetails;