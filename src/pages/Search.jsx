import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
    const [donors, setDonors] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);

    
    useEffect(() => {
        fetch("/districts.json").then(res => res.json()).then(data => setDistricts(data));
        fetch("/upazilas.json").then(res => res.json()).then(data => setUpazilas(data));
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        const form = e.target;
        const bloodGroup = form.bloodGroup.value;
        const district = form.district.value;
        const upazila = form.upazila.value;

        const res = await axios.get(`http://localhost:3000/search-donors?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`);
        setDonors(res.data);
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-8 text-red-600">Search Blood Donors 🔍</h2>
            
            
            <form onSubmit={handleSearch} className="bg-white p-6 rounded-xl shadow-lg border grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="form-control">
                    <label className="label font-bold text-sm">Blood Group</label>
                    <select name="bloodGroup" className="select select-bordered" required>
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
                    <label className="label font-bold text-sm">District</label>
                    <select name="district" className="select select-bordered" required>
                        <option value="">Select District</option>
                        {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                    </select>
                </div>

                <div className="form-control">
                    <label className="label font-bold text-sm">Upazila</label>
                    <select name="upazila" className="select select-bordered" required>
                        <option value="">Select Upazila</option>
                        {upazilas.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                    </select>
                </div>

                <button type="submit" className="btn bg-red-600 hover:bg-red-700 text-white border-none w-full">Search</button>
            </form>

            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {donors.length > 0 ? (
                    donors.map(donor => (
                        <div key={donor._id} className="card bg-base-100 shadow-md border-t-4 border-red-500 hover:shadow-xl transition">
                            <div className="card-body">
                                <h3 className="card-title text-xl">{donor.name}</h3>
                                <p>🩸 <span className="font-bold">Group:</span> {donor.bloodGroup}</p>
                                <p>📍 <span className="font-bold">Address:</span> {donor.upazila}, {donor.district}</p>
                                <p>📧 <span className="font-bold">Email:</span> {donor.email}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-400 py-10">
                        No donors found. Try changing the filters.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;