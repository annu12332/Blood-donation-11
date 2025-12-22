import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AllFunding = () => {
    const axiosSecure = useAxiosSecure();

    const { data: allPayments = [] } = useQuery({
        queryKey: ['all-payments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-payments');
            return res.data;
        }
    });

    // মোট ফান্ড ক্যালকুলেট করা
    const totalFund = allPayments.reduce((sum, item) => sum + parseFloat(item.price), 0);

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">All Funding Records</h2>
                <div className="bg-blue-100 p-4 rounded-lg border border-blue-200">
                    <p className="text-blue-900 font-semibold">Total Fund Collected:</p>
                    <p className="text-2xl font-bold text-blue-700">${totalFund.toFixed(2)}</p>
                </div>
            </div>

            <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200 bg-white">
                <table className="table w-full">
                    {/* Table Head */}
                    <thead className="bg-blue-900 text-white text-base">
                        <tr>
                            <th>#</th>
                            <th>Donor Name</th>
                            <th>Donor Email</th>
                            <th>Amount</th>
                            <th>Transaction ID</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allPayments.length > 0 ? (
                            allPayments.map((payment, index) => (
                                <tr key={payment._id} className="hover:bg-blue-50 transition-colors">
                                    <th>{index + 1}</th>
                                    <td className="font-medium text-gray-700">{payment.name || 'Anonymous'}</td>
                                    <td className="text-gray-600">{payment.email}</td>
                                    <td className="font-bold text-green-600">${payment.price}</td>
                                    <td className="text-sm font-mono bg-gray-100 p-1 rounded">{payment.transactionId}</td>
                                    <td className="text-gray-600">
                                        {new Date(payment.date).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-10 text-gray-500 italic">
                                    No funding records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllFunding;