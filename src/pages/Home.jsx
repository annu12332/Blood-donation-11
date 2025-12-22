import { useEffect, useState } from "react";
import { Link } from "react-router"; 
import useAxiosPublic from "../hooks/useAxiosPublic";
import Banner from "../components/Banner";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [stats, setStats] = useState({ users: 0, requests: 0, doneDonations: 0 });
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('/featured-blogs') 
            .then(res => setBlogs(res.data))
            .catch(err => console.error("Blog fetch error:", err));

        axiosPublic.get('/public-stats')
            .then(res => setStats(res.data))
            .catch(err => console.error("Stats fetch error:", err));
    }, [axiosPublic]);

    return (
        <div>
            <Banner />
            
            <div className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-10 bg-red-50 rounded-2xl shadow-sm border-t-4 border-red-500">
                            <h3 className="text-4xl font-bold text-red-600 mb-2">{stats.users}</h3>
                            <p className="text-gray-700 font-semibold uppercase tracking-wider">Registered Donors</p>
                        </div>
                        <div className="p-10 bg-red-50 rounded-2xl shadow-sm border-t-4 border-red-500">
                            <h3 className="text-4xl font-bold text-red-600 mb-2">{stats.requests}</h3>
                            <p className="text-gray-700 font-semibold uppercase tracking-wider">Total Requests</p>
                        </div>
                        <div className="p-10 bg-red-50 rounded-2xl shadow-sm border-t-4 border-red-500">
                            <h3 className="text-4xl font-bold text-red-600 mb-2">{stats.doneDonations}</h3>
                            <p className="text-gray-700 font-semibold uppercase tracking-wider">Happy Survivors</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-20 bg-gray-50 text-center px-4">
                <h2 className="text-3xl font-bold mb-10 text-gray-800 uppercase tracking-widest">Our Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 container mx-auto">
                    <div className="p-8 bg-white shadow-md rounded-lg border-b-4 border-red-500 hover:scale-105 transition-transform group">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-500 transition-colors">
                            <svg className="w-8 h-8 text-red-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <h3 className="font-bold text-xl mb-2">Easy Search</h3>
                        <p className="text-gray-600 font-medium">মুহূর্তেই আপনার এলাকায় রক্তদাতা খুঁজে বের করুন।</p>
                    </div>
                    <div className="p-8 bg-white shadow-md rounded-lg border-b-4 border-red-500 hover:scale-105 transition-transform group">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-500 transition-colors">
                            <svg className="w-8 h-8 text-red-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <h3 className="font-bold text-xl mb-2">Quick Request</h3>
                        <p className="text-gray-600 font-medium">জরুরি প্রয়োজনে রক্তের জন্য আবেদন করুন সহজে।</p>
                    </div>
                    <div className="p-8 bg-white shadow-md rounded-lg border-b-4 border-red-500 hover:scale-105 transition-transform group">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-500 transition-colors">
                            <svg className="w-8 h-8 text-red-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                        </div>
                        <h3 className="font-bold text-xl mb-2">Secure Data</h3>
                        <p className="text-gray-600 font-medium">আপনার ব্যক্তিগত তথ্য আমাদের কাছে সুরক্ষিত।</p>
                    </div>
                </div>
            </div>

            {blogs.length > 0 && (
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-10 uppercase tracking-widest">Featured Blogs</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {blogs.slice(0, 3).map(blog => (
                                <div key={blog._id} className="card bg-base-100 shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow">
                                    <figure>
                                        <img src={blog.thumbnail || blog.image} alt="blog" className="h-56 w-full object-cover" />
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="card-title text-red-600 font-bold">{blog.title}</h2>
                                        <p className="line-clamp-3 text-gray-500 text-sm leading-relaxed">
                                            {blog.content?.replace(/<[^>]*>?/gm, '')}
                                        </p>
                                        <div className="card-actions justify-end mt-4">
                                            <Link to={`/blog-details/${blog._id}`} className="btn btn-error btn-sm text-white px-6">
                                                Read More
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-12">
                            <Link to="/blog" className="btn btn-outline btn-error px-10 rounded-full font-bold">View All Blogs</Link>
                        </div>
                    </div>
                </section>
            )}

            <ContactUs />
            <Footer/>
        </div>
    );
};

export default Home;