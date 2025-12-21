import { useEffect, useState } from "react";
import { Link } from "react-router"; // Link ইম্পোর্ট করতে হবে
import axios from "axios";
import Banner from "../components/Banner";
import ContactUs from "../components/ContactUs";

const Home = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        // ব্যাকএন্ড থেকে পাবলিশ করা ব্লগগুলো নিয়ে আসা
        axios.get('http://localhost:5000/featured-blogs') 
            .then(res => setBlogs(res.data))
            .catch(err => console.error("Blog fetch error:", err));
    }, []);

    return (
        <div>
            <Banner />
            
            {/* Features Section */}
            <div className="py-20 bg-gray-50 text-center px-4">
                <h2 className="text-3xl font-bold mb-10 text-gray-800 uppercase">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 container mx-auto">
                    <div className="p-8 bg-white shadow-md rounded-lg border-b-4 border-red-500 hover:scale-105 transition-transform">
                        <h3 className="font-bold text-lg mb-2">Easy Search</h3>
                        <p>মুহূর্তেই আপনার এলাকায় রক্তদাতা খুঁজে বের করুন।</p>
                    </div>
                    <div className="p-8 bg-white shadow-md rounded-lg border-b-4 border-red-500 hover:scale-105 transition-transform">
                        <h3 className="font-bold text-lg mb-2">Quick Request</h3>
                        <p>জরুরি প্রয়োজনে রক্তের জন্য আবেদন করুন সহজে।</p>
                    </div>
                    <div className="p-8 bg-white shadow-md rounded-lg border-b-4 border-red-500 hover:scale-105 transition-transform">
                        <h3 className="font-bold text-lg mb-2">Secure Data</h3>
                        <p>আপনার ব্যক্তিগত তথ্য আমাদের কাছে সুরক্ষিত।</p>
                    </div>
                </div>
            </div>

            {/* Featured Blogs Section */}
            {blogs.length > 0 && (
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-10 uppercase">Featured Blogs</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {blogs.slice(0, 3).map(blog => (
                                <div key={blog._id} className="card bg-base-100 shadow-xl border">
                                    <figure>
                                        <img src={blog.image} alt="blog" className="h-48 w-full object-cover" />
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="card-title text-red-600">{blog.title}</h2>
                                        {/* HTML ট্যাগ রিমুভ করে ডিসক্রিপশন দেখানো */}
                                        <p className="line-clamp-2 text-gray-600">
                                            {blog.content?.replace(/<[^>]*>?/gm, '')}
                                        </p>
                                        <div className="card-actions justify-end mt-4">
                                            <Link to={`/blog-details/${blog._id}`} className="btn btn-error btn-sm text-white">
                                                Read More
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-10">
                            <Link to="/blog" className="btn btn-outline btn-error">View All Blogs</Link>
                        </div>
                    </div>
                </section>
            )}

            <ContactUs />
        </div>
    );
};

export default Home;