import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router"; 
import { useAuth } from "../provider/AuthProvider"; 
import { toast } from "react-hot-toast";

export default function Login() {
  const { loginWithEmailPassword } = useAuth(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await loginWithEmailPassword(email, password);
      toast.success("Login successful! 🎉");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="p-8 rounded-2xl shadow-xl w-96 bg-white border border-gray-100">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Login</h2>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:border-blue-500 outline-none transition-all"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:border-blue-500 outline-none transition-all"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 rounded-full font-bold text-white transition-all ${
              loading ? "bg-gray-400" : "bg-blue-700 hover:bg-blue-800"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-bold hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}