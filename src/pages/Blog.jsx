import { useEffect, useState } from "react";
import axios from "axios";

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        axios.get('https://blood-donation-backentd-11.vercel.app/all-blogs')
            .then(res => {
                setBlogs(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center py-20 text-2xl">Loading Blogs...</div>;

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-4xl font-bold text-center text-red-600 mb-12">Our Latest Blogs</h2>
            
            {blogs.length === 0 ? (
                <p className="text-center text-gray-500">No published blogs found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map(blog => (
                        <div key={blog._id} className="card bg-base-100 shadow-xl overflow-hidden border">
                            <figure>
                                <img src={blog.image} alt={blog.title} className="h-52 w-full object-cover" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title text-xl font-bold">{blog.title}</h2>
                                <p className="text-gray-600 line-clamp-3">
                                    
                                    {blog.content.replace(/<[^>]*>?/gm, '').substring(0, 100)}...
                                </p>
                                <div className="card-actions justify-end mt-4">
                                    <button className="btn btn-error btn-sm text-white">Read More</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Blog;