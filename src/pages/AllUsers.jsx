import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure"; 

const AllUsers = () => {
    const axiosSecure = useAxiosSecure(); 
    
    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    const handleRoleChange = async (id, newRole) => {
        const res = await axiosSecure.patch(`/users/role/${id}`, { role: newRole });
        if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire("Success", `User is now a ${newRole}`, "success");
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        const res = await axiosSecure.patch(`/users/status/${id}`, { status: newStatus });
        if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire("Updated", `User status is now ${newStatus}`, "success");
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-blue-900">Total Users: {users.length}</h2>
            
            <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
                <table className="table w-full">
                    {/* Head */}
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th>Avatar</th>
                            <th>Info</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={user.avatar} alt="Avatar" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="font-bold">{user.name}</div>
                                    <div className="text-sm opacity-50">{user.email}</div>
                                </td>
                                <td className="capitalize">
                                    <span className="badge badge-ghost font-semibold">{user.role}</span>
                                </td>
                                <td>
                                    <span className={`badge border-none text-white ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="flex justify-center items-center gap-3">
                                        <select 
                                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                            className="select select-bordered select-xs w-full max-w-[120px]"
                                            defaultValue={user.role}
                                        >
                                            <option value="donor">Donor</option>
                                            <option value="volunteer">Volunteer</option>
                                            <option value="admin">Admin</option>
                                        </select>

                                        <button 
                                            onClick={() => handleStatusChange(user._id, user.status === 'active' ? 'blocked' : 'active')} 
                                            className={`btn btn-xs ${user.status === 'active' ? 'btn-error' : 'btn-success'} text-white w-20`}
                                        >
                                            {user.status === 'active' ? 'Block' : 'Unblock'}
                                        </button>
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