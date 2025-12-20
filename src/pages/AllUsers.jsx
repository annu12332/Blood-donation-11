import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const AllUsers = () => {
    
    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/users");
            return res.data;
        },
    });

    
    const handleRoleChange = async (id, newRole) => {
        const res = await axios.patch(`http://localhost:5000/users/role/${id}`, { role: newRole });
        if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire("Success", `User is now a ${newRole}`, "success");
        }
    };

   
    const handleStatusChange = async (id, newStatus) => {
        const res = await axios.patch(`http://localhost:5000/users/status/${id}`, { status: newStatus });
        if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire("Updated", `User status is now ${newStatus}`, "success");
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-blue-900">All Users: {users.length}</h2>
            
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="table w-full border-collapse">
                    <thead>
                        <tr className="bg-blue-100 text-blue-900">
                            <th className="p-3 text-left">Avatar</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Role</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="border-b hover:bg-gray-50">
                                <td className="p-3">
                                    <img src={user.avatar} alt="avatar" className="w-10 h-10 rounded-full border" />
                                </td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3">{user.name}</td>
                                <td className="p-3 capitalize">{user.role}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="p-3 flex justify-center gap-2">
                                    {/* Role Management */}
                                    <select 
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                        className="select select-bordered select-sm"
                                        defaultValue={user.role}
                                    >
                                        <option value="donor">Donor</option>
                                        <option value="volunteer">Volunteer</option>
                                        <option value="admin">Admin</option>
                                    </select>

                                    {/* Status Management */}
                                    {user.status === 'active' ? (
                                        <button onClick={() => handleStatusChange(user._id, 'blocked')} className="btn btn-sm btn-error text-white">Block</button>
                                    ) : (
                                        <button onClick={() => handleStatusChange(user._id, 'active')} className="btn btn-sm btn-success text-white">Unblock</button>
                                    )}
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