import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useRole from "../hooks/useRole";

const ContentManagement = () => {
    const [role] = useRole();
    
    const { data: blogs = [], refetch } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/all-blogs');
            return res.data;
        }
    });

    const handleStatusChange = async (id, status) => {
        const newStatus = status === 'draft' ? 'published' : 'draft';
        await axios.patch(`http://localhost:5000/blogs/${id}`, { status: newStatus });
        refetch();
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Content Management</h2>
                <Link to="add-blog" className="btn btn-error text-white">Add Blog</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map(blog => (
                    <div key={blog._id} className="card bg-base-100 shadow-xl border">
                        <figure><img src={blog.image} alt="Blog" className="h-48 w-full object-cover" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{blog.title}</h2>
                            <p className="text-sm text-gray-500">{blog.content.slice(0, 100)}...</p>
                            <div className="flex justify-between items-center mt-4">
                                <span className={`badge ${blog.status === 'published' ? 'badge-success' : 'badge-warning'}`}>
                                    {blog.status}
                                </span>
                                
                                <div className="flex gap-2">
                                    {role === 'admin' && (
                                        <button 
                                            onClick={() => handleStatusChange(blog._id, blog.status)}
                                            className="btn btn-xs btn-outline"
                                        >
                                            {blog.status === 'draft' ? 'Publish' : 'Unpublish'}
                                        </button>
                                    )}
                                    {role === 'admin' && <button className="btn btn-xs btn-error text-white">Delete</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContentManagement;