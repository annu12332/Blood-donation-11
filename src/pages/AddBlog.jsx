import axios from "axios";
import { useNavigate } from "react-router";

const AddBlog = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const blogData = {
            title: form.title.value,
            image: form.image.value,
            content: form.content.value,
            status: 'draft' 
        };

        try {
            await axios.post('http://localhost:5000/blogs', blogData);
            navigate('/dashboard/content-management');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Create New Blog</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="title" placeholder="Blog Title" className="input input-bordered w-full" required />
                <input name="image" placeholder="Image URL" className="input input-bordered w-full" required />
                <textarea name="content" placeholder="Write your blog here..." className="textarea textarea-bordered w-full h-40" required></textarea>
                <button type="submit" className="btn btn-error w-full text-white">Create Blog</button>
            </form>
        </div>
    );
};

export default AddBlog;