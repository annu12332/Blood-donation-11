import React, { useState, useEffect } from "react";
import { useAuth } from "../provider/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router";

const Signup = () => {
  const { registerWithEmailPassword, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ১. জেলা ও উপজেলা ডাটা লোড করা
  useEffect(() => {
    fetch("/districts.json") 
      .then((res) => res.json())
      .then((data) => setDistricts(data));

    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => setUpazilas(data));
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match!");
    }

    setLoading(true);

    try {
    
      const imageFile = e.target.image.files[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const res = await axios.post(image_hosting_api, formData, {
        headers: { "content-type": "multipart/form-data" },
      });

      if (res.data.success) {
        const photoURL = res.data.data.display_url;

       
        await registerWithEmailPassword(email, password);

     
        await updateUserProfile(name, photoURL);

       
        const userInfo = {
          name,
          email,
          avatar: photoURL,
          bloodGroup,
          district,
          upazila,
          role: "donor", 
          status: "active", 
        };

        const dbRes = await axios.post('http://localhost:3000/users', userInfo);

        if(dbRes.data.insertedId){
            console.log("User saved to database");
            alert("Registration successful!");
            navigate("/"); 
        }
      }
    } catch (err) {
      console.error("Signup Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container py-10">
      <h2 className="text-3xl mb-6 font-bold text-center text-blue-700">
        Registration
      </h2>

      <form onSubmit={handleSignup} className="flex flex-col items-center gap-4 text-lg">
        {/* Name */}
        <input
          className="border-2 px-4 py-2 rounded-full w-80 outline-blue-500"
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Avatar Upload */}
        <div className="flex flex-col w-80">
          <label className="text-sm text-gray-500 ml-4 mb-1">Upload Avatar</label>
          <input
            className="text-sm border-2 rounded-full px-4 py-2"
            type="file"
            name="image"
            accept="image/*"
            required
          />
        </div>

        {/* Email */}
        <input
          className="border-2 px-4 py-2 rounded-full w-80 outline-blue-500"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Blood Group */}
        <select
          className="border-2 px-4 py-2 rounded-full w-80 bg-white"
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          required
        >
          <option value="">Select Blood Group</option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        {/* District */}
        <select
          className="border-2 px-4 py-2 rounded-full w-80 bg-white"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          required
        >
          <option value="">Select District</option>
          {districts.map((d) => (
            <option key={d.id} value={d.name}>{d.name}</option>
          ))}
        </select>

        {/* Upazila */}
        <select
          className="border-2 px-4 py-2 rounded-full w-80 bg-white"
          value={upazila}
          onChange={(e) => setUpazila(e.target.value)}
          required
        >
          <option value="">Select Upazila</option>
          {upazilas.map((u) => (
            <option key={u.id} value={u.name}>{u.name}</option>
          ))}
        </select>

        {/* Password */}
        <input
          className="border-2 px-4 py-2 rounded-full w-80 outline-blue-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Confirm Password */}
        <input
          className="border-2 px-4 py-2 rounded-full w-80 outline-blue-500"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button
          className={`${
            loading ? "bg-gray-400" : "bg-blue-700 hover:bg-blue-900"
          } text-white font-bold px-10 py-3 rounded-full mt-4 transition-all`}
          type="submit"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {error && <p className="text-red-600 text-center mt-4 font-semibold">{error}</p>}
    </div>
  );
};

export default Signup;