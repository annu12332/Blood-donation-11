import { useState, useEffect } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useAuth } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const Profile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/users/${user.email}`)
                .then(res => setUserData(res.data))
                .catch(err => console.error("Profile Fetch Error:", err));
        }
    }, [user, axiosSecure]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedInfo = {
            name: form.name.value,
            avatar: form.avatar.value,
            bloodGroup: form.bloodGroup.value,
            district: form.district.value,
            upazila: form.upazila.value,
        };

        try {
            const res = await axiosSecure.put(`/user/update/${user?.email}`, updatedInfo);
            if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
                Swal.fire("Success!", "Profile updated successfully", "success");
                setUserData({ ...userData, ...updatedInfo });
                setIsEditing(false);
            }
        } catch (error) {
            console.error("Update error:", error);
            Swal.fire("Error", "Something went wrong while updating", "error");
        }
    };

    if (!userData) return (
        <div className="flex justify-center items-center h-screen">
            <span className="loading loading-spinner loading-lg text-red-600"></span>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-xl border-t-8 border-red-600 my-10">
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
                <button 
                    onClick={() => setIsEditing(!isEditing)} 
                    className={`btn ${isEditing ? 'btn-ghost' : 'btn-error text-white'}`}
                >
                    {isEditing ? "Cancel" : "Edit Profile"}
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-10 items-start">
                <div className="w-full md:w-1/3 flex flex-col items-center">
                    <img 
                        src={userData.avatar || "https://i.ibb.co/mR3hPPW/user-placeholder.png"} 
                        alt="Profile" 
                        className="w-48 h-48 rounded-full object-cover border-4 border-red-100 shadow-lg"
                    />
                    <p className="mt-4 font-bold text-xl text-red-600 uppercase">{userData.bloodGroup}</p>
                    <p className="badge badge-outline mt-2 capitalize">{userData.role}</p>
                </div>

                <form onSubmit={handleUpdate} className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <div className="form-control">
                        <label className="label font-bold text-gray-700">Full Name</label>
                        <input name="name" type="text" defaultValue={userData.name} disabled={!isEditing} className="input input-bordered focus:border-red-500" required />
                    </div>
                    <div className="form-control">
                        <label className="label font-bold text-gray-700">Email</label>
                        <input type="text" value={userData.email} disabled className="input input-bordered bg-gray-100" />
                    </div>
                    <div className="form-control">
                        <label className="label font-bold text-gray-700">Profile Picture URL</label>
                        <input name="avatar" type="text" defaultValue={userData.avatar} disabled={!isEditing} className="input input-bordered focus:border-red-500" />
                    </div>
                    <div className="form-control">
                        <label className="label font-bold text-gray-700">Blood Group</label>
                        <select name="bloodGroup" defaultValue={userData.bloodGroup} disabled={!isEditing} className="select select-bordered focus:border-red-500">
                            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                                <option key={group} value={group}>{group}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-control">
                        <label className="label font-bold text-gray-700">District</label>
                        <input name="district" type="text" defaultValue={userData.district} disabled={!isEditing} className="input input-bordered focus:border-red-500" required />
                    </div>
                    <div className="form-control">
                        <label className="label font-bold text-gray-700">Upazila</label>
                        <input name="upazila" type="text" defaultValue={userData.upazila} disabled={!isEditing} className="input input-bordered focus:border-red-500" required />
                    </div>

                    {isEditing && (
                        <div className="md:col-span-2 mt-4">
                            <button type="submit" className="btn btn-error text-white w-full shadow-lg">Save Changes</button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Profile;