import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";


const UpdateDonationRequest = () => {
    const { id } = useParams();
    const [request, setRequest] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/donation-details/${id}`)
            .then(res => setRequest(res.data));
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedData = {
            recipientName: form.recipientName.value,
            hospitalName: form.hospitalName.value,
            fullAddress: form.fullAddress.value,
            status: form.status.value,
        };

        const res = await axios.patch(`http://localhost:5000/update-request/${id}`, updatedData);
        if (res.data.modifiedCount > 0) {
            Swal.fire("Success!", "Request Updated Successfully", "success");
        }
    };

    if (!request) return <p>Loading...</p>;

    return (
        <div className="bg-white p-10 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-5">Update Donation Request</h2>
            <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-4">
                <input name="recipientName" defaultValue={request.recipientName} className="input input-bordered" />
                <input name="hospitalName" defaultValue={request.hospitalName} className="input input-bordered" />
                <input name="fullAddress" defaultValue={request.fullAddress} className="input input-bordered" />
                <select name="status" defaultValue={request.status} className="select select-bordered">
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="canceled">Canceled</option>
                </select>
                <button className="btn btn-error text-white col-span-2">Update Request</button>
            </form>
        </div>
    );
};

export default UpdateDonationRequest;