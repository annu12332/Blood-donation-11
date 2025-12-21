import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaHandHoldingHeart, FaCheckCircle } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AdminHome = () => {
    const axiosSecure = useAxiosSecure(); 

    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">
            <span className="loading loading-spinner loading-lg text-red-600"></span>
        </div>;
    }

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Welcome back! 👋</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between transform hover:scale-105 transition-transform">
                    <div>
                        <p className="text-lg opacity-80">Total Users</p>
                        <h3 className="text-4xl font-bold">{stats.users || 0}</h3>
                    </div>
                    <FaUsers className="text-5xl opacity-30" />
                </div>

                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between transform hover:scale-105 transition-transform">
                    <div>
                        <p className="text-lg opacity-80">Donation Requests</p>
                        <h3 className="text-4xl font-bold">{stats.requests || 0}</h3>
                    </div>
                    <FaHandHoldingHeart className="text-5xl opacity-30" />
                </div>

                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between transform hover:scale-105 transition-transform">
                    <div>
                        <p className="text-lg opacity-80">Donations Done</p>
                        <h3 className="text-4xl font-bold">{stats.doneDonations || 0}</h3>
                    </div>
                    <FaCheckCircle className="text-5xl opacity-30" />
                </div>
            </div>
        </div>
    );
};

export default AdminHome;