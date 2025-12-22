import { Link, NavLink, useNavigate } from "react-router"; 
import { useAuth } from "../provider/AuthProvider";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logout()
            .then(() => {
                navigate("/"); 
            })
            .catch((error) => console.log(error));
    };

    const navOptions = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/donation-requests">Donation Requests</NavLink></li>
            <li><NavLink to="/blog">Blog</NavLink></li>
            
            {!user && (
                <>
                    <li><NavLink to="/login">Login</NavLink></li>
                    <li><NavLink to="/signup">Registration</NavLink></li>
                </>
            )}
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 px-4 md:px-8">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-medium">
                        {navOptions}
                    </ul>
                </div>

                {/* লোগো সেকশন */}
                <Link to="/" className="flex items-center gap-2">
               
                    <img className="w-10 h-10" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0vitZZGr_6e33OJ5WN7YkOvdZ95hRZfbgUw&s" alt="Blood Donation Logo" />
                    <span className="text-xl font-bold text-red-600 hidden md:block">BloodLife</span>
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-medium gap-2">
                    {navOptions}
                </ul>
            </div>

            <div className="navbar-end">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-red-500">
                            <div className="w-10 rounded-full">
                               
                                <img 
                                    alt="User Profile" 
                                    src={user?.photoURL || "https://i.ibb.co/mJR9Qkv/user.png"} 
                                    onError={(e) => { e.target.src = "https://i.ibb.co/mJR9Qkv/user.png" }}
                                />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 font-semibold">
                            <li className="p-2 text-red-600 font-bold">{user?.displayName || "User"}</li>
                            <div className="divider my-0"></div>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><button onClick={handleLogOut} className="text-red-500">Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <Link to="/login" className="btn bg-red-600 hover:bg-red-700 text-white border-none px-6">Join Us</Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;