import { useAuth } from "../provider/AuthProvider";
import { useState } from "react";

const Profile = () => {
    const { user } = useAuth();
    const [isEdit, setIsEdit] = useState(false);

    return (
        <div className="bg-white p-8 rounded-xl shadow-md border">
            <div className="flex flex-col items-center">
                <img src={user?.photoURL} alt="profile" className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover mb-4" />
                <h2 className="text-2xl font-bold">{user?.displayName}</h2>
                <p className="text-gray-500 mb-6">{user?.email}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-2">
                    <label className="font-semibold">Full Name</label>
                    <input type="text" defaultValue={user?.displayName} disabled={!isEdit} className="w-full border p-2 rounded bg-gray-50" />
                </div>
                <div className="space-y-2">
                    <label className="font-semibold">Blood Group</label>
                    <input type="text" defaultValue="O+" disabled className="w-full border p-2 rounded bg-gray-100" />
                </div>
                {/* আপনি সাইনআপ ফর্মে যে ডাটাগুলো নিয়েছিলেন সেগুলো এখানে দেখাবেন */}
            </div>

            <div className="mt-8 flex justify-center">
                {!isEdit ? (
                    <button onClick={() => setIsEdit(true)} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold">Edit Profile</button>
                ) : (
                    <button onClick={() => setIsEdit(false)} className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold">Save Changes</button>
                )}
            </div>
        </div>
    );
};

export default Profile;