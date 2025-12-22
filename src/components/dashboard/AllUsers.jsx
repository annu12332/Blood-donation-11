import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

const AllUsers = () => {
   
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axios.get('https://blood-donation-backentd-11.vercel.app//users');
            return res.data;
        }
    });

    const handleRoleChange = async (id, newRole) => {
        const res = await axios.patch(`https://blood-donation-backentd-11.vercel.app//users/role/${id}`, { role: newRole });
        if (res.data.modifiedCount > 0) {
            toast.success(`Role updated to ${newRole}`);
            refetch();
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        const res = await axios.patch(`https://blood-donation-backentd-11.vercel.app//users/status/${id}`, { status: newStatus });
        if (res.data.modifiedCount > 0) {
            toast.success(`User is now ${newStatus}`);
            refetch();
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-5">Total Users: {users.length}</h2>
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="table w-full">
                    <thead className="bg-gray-200">
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
                                <td><img className="w-10 h-10 rounded-full" src={user.avatar} alt="" /></td>
                                <td>
                                    <p className="font-bold">{user.name}</p>
                                    <p className="text-sm opacity-60">{user.email}</p>
                                </td>
                                <td className="capitalize">{user.role}</td>
                                <td>
                                    <span className={`badge ${user.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="flex gap-2">
                                    {/* Role Change Buttons */}
                                    <button 
                                        onClick={() => handleRoleChange(user._id, 'admin')}
                                        disabled={user.role === 'admin'}
                                        className="btn btn-xs btn-outline">Make Admin</button>
                                    
                                    {/* Status Change Buttons */}
                                    {user.status === 'active' ? 
                                        <button onClick={() => handleStatusChange(user._id, 'blocked')} className="btn btn-xs btn-error">Block</button> :
                                        <button onClick={() => handleStatusChange(user._id, 'active')} className="btn btn-xs btn-success">Unblock</button>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};