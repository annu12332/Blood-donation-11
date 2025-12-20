import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState(''); 

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const fetchAllUsers = async () => {
        const res = await axios.get('http://localhost:3000/users');
        setUsers(res.data);
    };

    
    const handleStatusChange = async (id, newStatus) => {
        try {
            const res = await axios.patch(`http://localhost:3000/users/status/${id}`, { status: newStatus });
            if (res.data.modifiedCount > 0) {
                toast.success(`User is now ${newStatus}`);
                fetchAllUsers();
            }
        } catch (err) {
            toast.error("Failed to update status");
        }
    };

    
    const handleRoleChange = async (id, newRole) => {
        try {
            const res = await axios.patch(`http://localhost:3000/users/role/${id}`, { role: newRole });
            if (res.data.modifiedCount > 0) {
                toast.success(`Role updated to ${newRole}`);
                fetchAllUsers();
            }
        } catch (err) {
            toast.error("Failed to update role");
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">All Users Management</h2>
            
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="table w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>Avatar</th>
                            <th>Name & Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u._id} className="hover:bg-gray-50">
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={u.image || u.photoURL || "https://img.icons8.com/color/96/user-male-circle--v1.png"} alt="User" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="font-bold">{u.name}</div>
                                    <div className="text-sm opacity-50">{u.email}</div>
                                </td>
                                <td className="capitalize">{u.role}</td>
                                <td>
                                    <span className={`badge ${u.status === 'blocked' ? 'badge-error' : 'badge-success'} text-white`}>
                                        {u.status || 'active'}
                                    </span>
                                </td>
                                <td>
                                    <div className="flex gap-2">
                                        
                                        <select 
                                            onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                            className="select select-bordered select-xs"
                                            defaultValue={u.role}
                                        >
                                            <option value="donor">Donor</option>
                                            <option value="volunteer">Volunteer</option>
                                            <option value="admin">Admin</option>
                                        </select>

                                        
                                        {u.status === 'blocked' ? (
                                            <button onClick={() => handleStatusChange(u._id, 'active')} className="btn btn-xs btn-outline btn-success">Unblock</button>
                                        ) : (
                                            <button onClick={() => handleStatusChange(u._id, 'blocked')} className="btn btn-xs btn-outline btn-error">Block</button>
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