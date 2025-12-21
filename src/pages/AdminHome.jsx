import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaUsers, FaHandHoldingHeart, FaCheckCircle } from "react-icons/fa";

const AdminHome = () => {
    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/admin-stats');
            return res.data;
        }
    });

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-8">Welcome back! 👋</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Users Card */}
                <div className="bg-blue-500 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between">
                    <div>
                        <p className="text-lg opacity-80">Total Users</p>
                        <h3 className="text-4xl font-bold">{stats.users}</h3>
                    </div>
                    <FaUsers className="text-5xl opacity-30" />
                </div>

                {/* Total Requests Card */}
                <div className="bg-red-500 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between">
                    <div>
                        <p className="text-lg opacity-80">Donation Requests</p>
                        <h3 className="text-4xl font-bold">{stats.requests}</h3>
                    </div>
                    <FaHandHoldingHeart className="text-5xl opacity-30" />
                </div>

                {/* Success Donations Card */}
                <div className="bg-green-500 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between">
                    <div>
                        <p className="text-lg opacity-80">Donations Done</p>
                        <h3 className="text-4xl font-bold">{stats.doneDonations}</h3>
                    </div>
                    <FaCheckCircle className="text-5xl opacity-30" />
                </div>
            </div>
        </div>
    );
};

export default AdminHome;