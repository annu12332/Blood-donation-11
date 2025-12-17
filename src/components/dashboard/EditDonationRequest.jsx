import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../provider/AuthProvider";
import axios from "axios";
import { toast } from "react-hot-toast";

const EditDonationRequest = () => {
    const { id } = useParams(); 
    const { user } = useAuth();
    const navigate = useNavigate();

    const [requestData, setRequestData] = useState({});
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        
        fetch("/districts.json").then(res => res.json()).then(data => setDistricts(data));
        fetch("/upazilas.json").then(res => res.json()).then(data => setUpazilas(data));

        
        axios.get(`http://localhost:3000/donation-request-details/${id}`)
            .then(res => {
                setRequestData(res.data);
                setLoading(false);
            })
            .catch(err => {
                toast.error("Error loading data");
                setLoading(false);
            });
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;

        const updatedInfo = {
            recipientName: form.recipientName.value,
            recipientDistrict: form.district.value,
            recipientUpazila: form.upazila.value,
            hospitalName: form.hospitalName.value,
            fullAddress: form.fullAddress.value,
            donationDate: form.donationDate.value,
            donationTime: form.donationTime.value,
            requestMessage: form.requestMessage.value,
        };

        try {
            const res = await axios.patch(`http://localhost:3000/donation-requests/${id}`, updatedInfo);
            if (res.data.modifiedCount > 0) {
                toast.success("Request Updated Successfully! 🎉");
                navigate("/dashboard/my-donation-requests");
            }
        } catch (err) {
            toast.error("Failed to update request.");
        }
    };

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm border max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-green-700 text-center mb-8">Update Donation Request</h2>

            <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="form-control">
                    <label className="label font-semibold">Requester Name</label>
                    <input type="text" value={user?.displayName} readOnly className="input input-bordered bg-gray-100" />
                </div>
                <div className="form-control">
                    <label className="label font-semibold">Requester Email</label>
                    <input type="email" value={user?.email} readOnly className="input input-bordered bg-gray-100" />
                </div>

              
                <div className="form-control">
                    <label className="label font-semibold">Recipient Name</label>
                    <input name="recipientName" type="text" defaultValue={requestData.recipientName} className="input input-bordered" required />
                </div>

                <div className="form-control">
                    <label className="label font-semibold">Hospital Name</label>
                    <input name="hospitalName" type="text" defaultValue={requestData.hospitalName} className="input input-bordered" required />
                </div>

                <div className="form-control">
                    <label className="label font-semibold">District</label>
                    <select name="district" className="select select-bordered" defaultValue={requestData.recipientDistrict} required>
                        <option value="">Select District</option>
                        {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                    </select>
                </div>

                <div className="form-control">
                    <label className="label font-semibold">Upazila</label>
                    <select name="upazila" className="select select-bordered" defaultValue={requestData.recipientUpazila} required>
                        <option value="">Select Upazila</option>
                        {upazilas.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                    </select>
                </div>

                <div className="form-control">
                    <label className="label font-semibold">Donation Date</label>
                    <input name="donationDate" type="date" defaultValue={requestData.donationDate} className="input input-bordered" required />
                </div>

                <div className="form-control">
                    <label className="label font-semibold">Donation Time</label>
                    <input name="donationTime" type="time" defaultValue={requestData.donationTime} className="input input-bordered" required />
                </div>

                <div className="form-control md:col-span-2">
                    <label className="label font-semibold">Full Address Line</label>
                    <input name="fullAddress" type="text" defaultValue={requestData.fullAddress} className="input input-bordered" required />
                </div>

                <div className="form-control md:col-span-2">
                    <label className="label font-semibold">Request Message</label>
                    <textarea name="requestMessage" defaultValue={requestData.requestMessage} className="textarea textarea-bordered h-24" required></textarea>
                </div>

                <div className="md:col-span-2 mt-4">
                    <button type="submit" className="btn w-full bg-green-600 hover:bg-green-700 text-white border-none text-lg">
                        Update Request
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditDonationRequest;