import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-hot-toast";

const AddBlog = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const blogData = {
            title: form.title.value,
            thumbnail: form.thumbnail.value,
            content: form.content.value,
            status: "draft", // ডিফল্টভাবে ড্রাফট থাকবে
            createdAt: new Date().toISOString()
        };

        try {
            const res = await axios.post("http://localhost:3000/blogs", blogData);
            if (res.data.insertedId) {
                toast.success("Blog created as draft!");
                navigate("/dashboard/content-management");
            }
        } catch (error) {
            toast.error("Failed to create blog");
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border">
            <h2 className="text-2xl font-bold mb-6">Add New Blog</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                    <label className="label font-semibold">Blog Title</label>
                    <input name="title" type="text" placeholder="Title" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label font-semibold">Thumbnail URL</label>
                    <input name="thumbnail" type="text" placeholder="Image URL" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label font-semibold">Content</label>
                    <textarea name="content" className="textarea textarea-bordered h-40" placeholder="Write your blog content here..." required></textarea>
                </div>
                <button type="submit" className="btn btn-error w-full text-white">Create Blog</button>
            </form>
        </div>
    );
};

export default AddBlog;