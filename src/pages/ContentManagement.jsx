import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import { toast } from "react-hot-toast";
import useRole from "../hooks/UseRole";

const ContentManagement = () => {
    const [blogs, setBlogs] = useState([]);
    const [role] = useRole();

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        const res = await axios.get("http://localhost:3000/blogs");
        setBlogs(res.data);
    };

    const handleStatusChange = async (id, status) => {
        const res = await axios.patch(`http://localhost:5000/blogs/${id}`, { status });
        if (res.data.modifiedCount > 0) {
            toast.success(`Blog ${status}ed!`);
            fetchBlogs();
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Content Management</h2>
                <Link to="/dashboard/content-management/add-blog" className="btn btn-primary btn-sm">
                    Add Blog
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map(blog => (
                    <div key={blog._id} className="card bg-white shadow-sm border">
                        <figure className="h-40 overflow-hidden">
                            <img src={blog.thumbnail} alt="blog" className="w-full object-cover" />
                        </figure>
                        <div className="card-body p-4">
                            <h2 className="card-title text-lg">{blog.title}</h2>
                            <p className="text-sm text-gray-500">{blog.content.slice(0, 100)}...</p>
                            <div className="flex justify-between items-center mt-4">
                                <span className={`badge ${blog.status === 'published' ? 'badge-success' : 'badge-ghost'}`}>
                                    {blog.status}
                                </span>
                                
                                {role === 'admin' && (
                                    <div className="flex gap-2">
                                        {blog.status === 'draft' ? (
                                            <button onClick={() => handleStatusChange(blog._id, 'published')} className="btn btn-xs btn-outline btn-success">Publish</button>
                                        ) : (
                                            <button onClick={() => handleStatusChange(blog._id, 'draft')} className="btn btn-xs btn-outline btn-warning">Unpublish</button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContentManagement;