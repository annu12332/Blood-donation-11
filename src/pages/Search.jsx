import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
    const [donors, setDonors] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [filteredUpazilas, setFilteredUpazilas] = useState([]); 
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch("/districts.json").then(res => res.json()).then(data => setDistricts(data));
        fetch("/upazilas.json").then(res => res.json()).then(data => setUpazilas(data));
    }, []);

   
    const handleDistrictChange = (e) => {
    const selectedDistrictName = e.target.value;
    
    
    const district = districts.find(d => d.name === selectedDistrictName);
    
    if (district) {
        
        const filtered = upazilas.filter(u => String(u.district_id) === String(district.id));
        setFilteredUpazilas(filtered);
        
        

    } else {
        setFilteredUpazilas([]);
    }
};

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const bloodGroup = form.bloodGroup.value;
        const district = form.district.value;
        const upazila = form.upazila.value;

        try {
            // আপনার backend এর base URL টি .env থেকে নেওয়া ভালো
            const res = await axios.get(`http://localhost:5000/search-donors?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`);
            setDonors(res.data);
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-10 min-h-screen">
            <h2 className="text-4xl font-extrabold text-center mb-10 text-red-600">Find Blood Donors 🔍</h2>
            
            <form onSubmit={handleSearch} className="bg-white p-8 rounded-2xl shadow-2xl border-t-4 border-red-500 grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                <div className="form-control">
                    <label className="label font-bold text-gray-700">Blood Group</label>
                    <select name="bloodGroup" className="select select-bordered focus:ring-2 focus:ring-red-500" required defaultValue="">
                        <option value="" disabled>Select Group</option>
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

                <div className="form-control">
                    <label className="label font-bold text-gray-700">District</label>
                    <select name="district" onChange={handleDistrictChange} className="select select-bordered focus:ring-2 focus:ring-red-500" required defaultValue="">
                        <option value="" disabled>Select District</option>
                        {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                    </select>
                </div>

                <div className="form-control">
                    <label className="label font-bold text-gray-700">Upazila</label>
                    <select name="upazila" className="select select-bordered focus:ring-2 focus:ring-red-500" required defaultValue="">
                        <option value="" disabled>Select Upazila</option>
                        {filteredUpazilas.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                    </select>
                </div>

                <button type="submit" className={`btn bg-red-600 hover:bg-red-700 text-white border-none w-full text-lg shadow-md ${loading ? 'loading' : ''}`}>
                    {loading ? 'Searching...' : 'Search Now'}
                </button>
            </form>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {donors.length > 0 ? (
                    donors.map(donor => (
                        <div key={donor._id} className="card bg-base-100 shadow-lg border border-gray-100 hover:scale-105 transition-transform duration-300">
                            <div className="card-body">
                                <div className="flex justify-between items-start">
                                    <h3 className="card-title text-2xl font-bold text-gray-800">{donor.name}</h3>
                                    <div className="badge badge-error p-3 text-white font-bold">{donor.bloodGroup}</div>
                                </div>
                                <div className="mt-4 space-y-2 text-gray-600">
                                    <p className="flex items-center gap-2">📍 <span>{donor.upazila}, {donor.district}</span></p>
                                    <p className="flex items-center gap-2">📧 <span>{donor.email}</span></p>
                                </div>
                                <div className="card-actions justify-end mt-4">
                                    <a href={`mailto:${donor.email}`} className="btn btn-sm btn-outline btn-error">Contact Donor</a>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    !loading && (
                        <div className="col-span-full flex flex-col items-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                            <p className="text-6xl mb-4">🏠</p>
                            <p className="text-xl text-gray-500 font-medium">No donors found in this area. Try another location.</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default Search;