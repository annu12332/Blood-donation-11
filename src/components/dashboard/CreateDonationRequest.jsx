import React, { useState, useEffect } from "react";
import { useAuth } from "../../provider/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";

const CreateDonationRequest = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data));

    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => setUpazilas(data));
  }, []);

  const handleCreateRequest = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
  
    const requestData = {
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      recipientName: form.recipientName.value,
      recipientDistrict: form.district.value,
      recipientUpazila: form.upazila.value,
      hospitalName: form.hospitalName.value,
      fullAddress: form.fullAddress.value,
      donationDate: form.donationDate.value,
      donationTime: form.donationTime.value,
      requestMessage: form.requestMessage.value,
      status: "pending",
    };

    try {
    
      const res = await axios.post("http://localhost:3000/donation-requests", requestData);

      if (res.data.insertedId) {
        toast.success("Donation Request Created Successfully!");
        navigate("/dashboard/my-donation-requests"); 
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to create request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-700 text-center mb-8">Create Blood Donation Request 🩸</h2>

      <form onSubmit={handleCreateRequest} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
       
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
          <input name="recipientName" type="text" placeholder="Who needs blood?" className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label font-semibold">Hospital Name</label>
          <input name="hospitalName" type="text" placeholder="Hospital (e.g., Dhaka Medical)" className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label font-semibold">District</label>
          <select name="district" className="select select-bordered" required>
            <option value="">Select District</option>
            {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
          </select>
        </div>

        <div className="form-control">
          <label className="label font-semibold">Upazila</label>
          <select name="upazila" className="select select-bordered" required>
            <option value="">Select Upazila</option>
            {upazilas.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
          </select>
        </div>

        <div className="form-control">
          <label className="label font-semibold">Donation Date</label>
          <input name="donationDate" type="date" className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label font-semibold">Donation Time</label>
          <input name="donationTime" type="time" className="input input-bordered" required />
        </div>

        <div className="form-control md:col-span-2">
          <label className="label font-semibold">Full Address Line</label>
          <input name="fullAddress" type="text" placeholder="e.g., Room 402, 4th Floor" className="input input-bordered" required />
        </div>

        <div className="form-control md:col-span-2">
          <label className="label font-semibold">Request Message</label>
          <textarea name="requestMessage" placeholder="Why do you need blood?" className="textarea textarea-bordered h-24" required></textarea>
        </div>

        <div className="md:col-span-2 mt-4">
          <button 
            type="submit" 
            disabled={loading}
            className={`btn w-full bg-red-600 hover:bg-red-700 text-white border-none text-lg font-bold ${loading && 'loading'}`}
          >
            {loading ? 'Creating Request...' : 'Submit Request'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDonationRequest;