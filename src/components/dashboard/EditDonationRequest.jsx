import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getAuth } from "firebase/auth";
import axios from "axios";
import Swal from "sweetalert2";

const EditDonationRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [requestData, setRequestData] = useState({
    recipientName: "",
    district: "",
    upazila: "",
    hospitalName: "",
    fullAddress: "",
    donationDate: "",
    donationTime: "",
    bloodGroup: "",
    description: "",
  });

  useEffect(() => {
    const getRequestDetails = async () => {
      try {
        const token = await auth.currentUser?.getIdToken();
        const res = await axios.get(
          `https://blood-donation-backentd-11.vercel.app/donation-request-details/${id}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setRequestData(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    if (auth.currentUser) {
      getRequestDetails();
    }
  }, [id, auth.currentUser]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedInfo = {
      recipientName: form.recipientName.value,
      district: form.district.value,
      upazila: form.upazila.value,
      hospitalName: form.hospitalName.value,
      fullAddress: form.fullAddress.value,
      donationDate: form.donationDate.value,
      donationTime: form.donationTime.value,
      bloodGroup: form.bloodGroup.value,
      description: form.description.value,
    };

    try {
      const token = await auth.currentUser?.getIdToken();
      const res = await axios.patch(
        `https://blood-donation-backentd-11.vercel.app/donation-requests/${id}`,
        updatedInfo,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Donation request updated successfully.",
          timer: 1500,
        });
        navigate("/dashboard/my-donation-requests");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Edit Donation Request
      </h2>
      <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-control">
          <label className="label">Recipient Name</label>
          <input
            name="recipientName"
            type="text"
            defaultValue={requestData.recipientName}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">Blood Group</label>
          <select name="bloodGroup" defaultValue={requestData.bloodGroup} className="select select-bordered w-full" required>
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
          <label className="label">District</label>
          <input
            name="district"
            type="text"
            defaultValue={requestData.district}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">Upazila</label>
          <input
            name="upazila"
            type="text"
            defaultValue={requestData.upazila}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">Hospital Name</label>
          <input
            name="hospitalName"
            type="text"
            defaultValue={requestData.hospitalName}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">Full Address</label>
          <input
            name="fullAddress"
            type="text"
            defaultValue={requestData.fullAddress}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">Donation Date</label>
          <input
            name="donationDate"
            type="date"
            defaultValue={requestData.donationDate}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">Donation Time</label>
          <input
            name="donationTime"
            type="time"
            defaultValue={requestData.donationTime}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control md:col-span-2">
          <label className="label">Description / Why needed?</label>
          <textarea
            name="description"
            defaultValue={requestData.description}
            className="textarea textarea-bordered h-24"
            required
          ></textarea>
        </div>

        <div className="md:col-span-2 mt-4">
          <button type="submit" className="btn btn-error w-full text-white">
            Update Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDonationRequest;