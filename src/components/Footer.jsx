import { FaFacebook, FaTwitter, FaInstagram, FaHeart } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-gray-300">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                    {/* Logo & About */}
                    <div className="col-span-1 md:col-span-1">
                        <h2 className="text-2xl font-bold text-red-600 mb-4">BloodLife</h2>
                        <p className="text-sm leading-relaxed">
                            BloodLife holo ekti projukti-nirbhor blood donation platform jekhane amra rokto-data ebong grohitar moddhe ekta shetubondhon toiri kori. Ek bag rokto, ekti pran!
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/" className="hover:text-red-500 transition">Home</Link></li>
                            <li><Link to="/donation-requests" className="hover:text-red-500 transition">Donation Requests</Link></li>
                            <li><Link to="/search" className="hover:text-red-500 transition">Search Donor</Link></li>
                            <li><Link to="/blog" className="hover:text-red-500 transition">Latest Blog</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">Contact Info</h3>
                        <ul className="space-y-2 text-sm">
                            <li>📍 Dhaka, Bangladesh</li>
                            <li>📞 +880 1234 567 890</li>
                            <li>📧 support@bloodlife.com</li>
                            <li>⏰ 24/7 Emergency Service</li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">Follow Us</h3>
                        <div className="flex gap-4 text-2xl">
                            <a href="#" className="hover:text-red-500 transition"><FaFacebook /></a>
                            <a href="#" className="hover:text-red-500 transition"><FaTwitter /></a>
                            <a href="#" className="hover:text-red-500 transition"><FaInstagram /></a>
                        </div>
                        <div className="mt-6">
                            <p className="text-xs uppercase tracking-widest font-semibold text-gray-500">Stay Updated</p>
                            <div className="flex mt-2">
                                <input type="email" placeholder="Email" className="bg-gray-800 border-none px-4 py-2 w-full rounded-l-md focus:ring-1 focus:ring-red-600 outline-none" />
                                <button className="bg-red-600 text-white px-4 py-2 rounded-r-md hover:bg-red-700">Go</button>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="divider border-gray-700 my-8"></div>

                <div className="flex flex-col md:flex-row justify-between items-center text-sm">
                    <p>© {new Date().getFullYear()} BloodLife. All Rights Reserved.</p>
                    <p className="flex items-center gap-1 mt-2 md:mt-0">
                        Made with <FaHeart className="text-red-600" /> by BloodLife Team
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;