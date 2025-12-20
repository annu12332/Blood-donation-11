import { useAuth } from "../../provider/AuthProvider";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

const CreateDonationRequest = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const requestData = {
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      recipientName: form.recipientName.value,
      district: form.district.value,
      upazila: form.upazila.value,
      hospitalName: form.hospitalName.value,
      fullAddress: form.fullAddress.value,
      bloodGroup: form.bloodGroup.value,
      donationDate: form.donationDate.value,
      donationTime: form.donationTime.value,
      requestMessage: form.requestMessage.value,
      status: "pending",
    };

    try {
      const res = await axios.post("http://localhost:3000/donation-requests", requestData);
      if (res.data.insertedId) {
        toast.success("Donation request created successfully!");
        navigate("/dashboard/my-donation-requests");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Create Blood Donation Request</h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Requester Info (Read Only) */}
        <div className="form-control">
          <label className="label font-semibold">Requester Name</label>
          <input type="text" value={user?.displayName} readOnly className="input input-bordered bg-gray-100" />
        </div>
        <div className="form-control">
          <label className="label font-semibold">Requester Email</label>
          <input type="email" value={user?.email} readOnly className="input input-bordered bg-gray-100" />
        </div>

        {/* Recipient Info */}
        <div className="form-control">
          <label className="label font-semibold text-red-600">Recipient Name *</label>
          <input name="recipientName" type="text" placeholder="Enter recipient name" className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label font-semibold text-red-600">Blood Group *</label>
          <select name="bloodGroup" className="select select-bordered" required>
            <option disabled selected>Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label font-semibold">District</label>
          <input name="district" type="text" placeholder="e.g. Dhaka" className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label font-semibold">Upazila</label>
          <input name="upazila" type="text" placeholder="e.g. Dhanmondi" className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label font-semibold text-red-600">Donation Date *</label>
          <input name="donationDate" type="date" className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label font-semibold text-red-600">Donation Time *</label>
          <input name="donationTime" type="time" className="input input-bordered" required />
        </div>

        <div className="form-control md:col-span-2">
          <label className="label font-semibold">Hospital Name & Full Address</label>
          <input name="hospitalName" type="text" placeholder="e.g. Dhaka Medical College Hospital" className="input input-bordered mb-2" required />
          <textarea name="fullAddress" className="textarea textarea-bordered h-24" placeholder="Full address details..."></textarea>
        </div>

        <div className="form-control md:col-span-2">
          <label className="label font-semibold">Request Message</label>
          <textarea name="requestMessage" className="textarea textarea-bordered h-24" placeholder="Explain why you need blood..."></textarea>
        </div>

        <div className="md:col-span-2 mt-4">
          <button type="submit" className="btn btn-error w-full text-white text-lg">Request Donation</button>
        </div>
      </form>
    </div>
  );
};

export default CreateDonationRequest;