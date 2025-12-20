import { Link } from "react-router";
import { FaPlus } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ContentManagement = () => {
    const { data: blogs = [], refetch } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/blogs');
            return res.data;
        }
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Content Management</h2>
                <Link to="/dashboard/content-management/add-blog" className="btn btn-primary btn-sm flex items-center gap-2">
                    <FaPlus /> Add Blog
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map(blog => (
                    <div key={blog._id} className="card bg-white shadow-xl border">
                        <figure className="px-4 pt-4">
                            <img src={blog.thumbnail} alt="blog" className="rounded-xl h-40 w-full object-cover" />
                        </figure>
                        <div className="card-body p-5">
                            <h2 className="card-title text-lg">{blog.title}</h2>
                            <p className="text-sm text-gray-500">{blog.content.slice(0, 100)}...</p>
                            <div className="card-actions justify-between items-center mt-4">
                                <span className={`badge ${blog.status === 'published' ? 'badge-success' : 'badge-ghost'}`}>
                                    {blog.status}
                                </span>
                                
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContentManagement;