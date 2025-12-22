import { useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Link } from "react-router";

const Search = () => {
    const axiosPublic = useAxiosPublic();
    const [donors, setDonors] = useState([]);
    const [searching, setSearching] = useState(false);
    const [searchedOnce, setSearchedOnce] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setSearching(true);
        setSearchedOnce(true);

        const form = e.target;
        const bloodGroup = form.bloodGroup.value;
        const district = form.district.value;
        const upazila = form.upazila.value;

        try {
            const res = await axiosPublic.get(`/donors-search?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`);
            setDonors(res.data);
        } catch (error) {
            console.error("Search error", error);
        } finally {
            setSearching(false);
        }
    };

    return (
        <div className="container mx-auto p-8 min-h-screen">
            <h2 className="text-4xl font-bold text-center mb-10 text-red-600">Find a Blood Donor</h2>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-red-50 p-8 shadow-xl rounded-2xl mb-12 border border-red-100">
                <div>
                    <label className="label font-semibold text-gray-700">Blood Group</label>
                    <select name="bloodGroup" className="select select-bordered w-full" required>
                        <option value="">Select Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                </div>
                
                <div>
                    <label className="label font-semibold text-gray-700">District</label>
                    <input name="district" placeholder="e.g. Dhaka" className="input input-bordered w-full" required />
                </div>

                <div>
                    <label className="label font-semibold text-gray-700">Upazila</label>
                    <input name="upazila" placeholder="e.g. Savar" className="input input-bordered w-full" required />
                </div>
                
                <div className="flex items-end">
                    <button type="submit" className="btn btn-error w-full text-white font-bold h-12">
                        {searching ? "Searching..." : "Search Donors"}
                    </button>
                </div>
            </form>

            {/* Results Section */}
            <div>
                {searching ? (
                    <div className="flex justify-center"><span className="loading loading-spinner loading-lg text-red-600"></span></div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {donors.length > 0 ? (
                            donors.map(donor => (
                                <div key={donor._id} className="card bg-white shadow-md border hover:shadow-2xl transition-all">
                                    <figure className="px-10 pt-10">
                                        <div className="avatar placeholder">
                                            <div className="bg-red-100 text-red-600 rounded-full w-20 border-2 border-red-500">
                                                <span className="text-2xl font-bold">{donor.bloodGroup}</span>
                                            </div>
                                        </div>
                                    </figure>
                                    <div className="card-body items-center text-center">
                                        <h2 className="card-title text-2xl text-gray-800">{donor.name}</h2>
                                        <p className="text-gray-500 font-medium">{donor.district}, {donor.upazila}</p>
                                        <div className="badge badge-outline badge-error mt-2">Available</div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            searchedOnce && <p className="col-span-full text-center text-gray-400 text-xl italic">No donors found. Please try another location or group.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;