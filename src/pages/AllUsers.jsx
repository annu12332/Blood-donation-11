import { useQuery } from "@tanstack/react-query"; 
import axios from "axios";
import { toast } from "react-hot-toast";

const AllUsers = () => {
    // ইউজারের ডাটা লোড করা
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/users');
            return res.data;
        }
    });

    // রোল পরিবর্তন ফাংশন
    const handleRoleChange = async (user, newRole) => {
        const res = await axios.patch(`http://localhost:3000/users/role/${user._id}`, { role: newRole });
        if (res.data.modifiedCount > 0) {
            toast.success(`${user.name} is now a ${newRole}`);
            refetch();
        }
    };

    // স্ট্যাটাস পরিবর্তন ফাংশন 
    const handleStatusChange = async (user, newStatus) => {
        const res = await axios.patch(`http://localhost:3000/users/status/${user._id}`, { status: newStatus });
        if (res.data.modifiedCount > 0) {
            toast.success(`User is now ${newStatus}`);
            refetch();
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Total Users: {users.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full border">
                    <thead className="bg-blue-100">
                        <tr>
                            <th>Avatar</th>
                            <th>Email & Name</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={user.image} alt="Avatar" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="font-bold">{user.name}</div>
                                    <div className="text-sm opacity-50">{user.email}</div>
                                </td>
                                <td className="capitalize font-medium">{user.role}</td>
                                <td>
                                    <span className={`badge ${user.status === 'active' ? 'badge-success' : 'badge-error text-white'}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="flex gap-2">
                                        {/* রোল চেঞ্জ ড্রপডাউন বা বাটন */}
                                        <select 
                                            onChange={(e) => handleRoleChange(user, e.target.value)}
                                            className="select select-bordered select-xs"
                                            defaultValue={user.role}
                                        >
                                            <option value="donor">Donor</option>
                                            <option value="volunteer">Volunteer</option>
                                            <option value="admin">Admin</option>
                                        </select>

                                        {/* ব্লক/আনব্লক বাটন */}
                                        {user.status === 'active' ? (
                                            <button onClick={() => handleStatusChange(user, 'blocked')} className="btn btn-xs btn-error text-white">Block</button>
                                        ) : (
                                            <button onClick={() => handleStatusChange(user, 'active')} className="btn btn-xs btn-success text-white">Unblock</button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;