import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useAuth } from "../provider/AuthProvider";

const MyFunding = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        }
    });

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-6">My Funding History</h2>
            <div className="overflow-x-auto bg-white rounded-xl shadow border">
                <table className="table w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>#</th>
                            <th>Amount</th>
                            <th>Transaction ID</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment._id}>
                                <td>{index + 1}</td>
                                <td className="font-bold text-green-600">${payment.price}</td>
                                <td className="text-sm font-mono">{payment.transactionId}</td>
                                <td>{new Date(payment.date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyFunding;