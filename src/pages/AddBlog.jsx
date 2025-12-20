import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const AddBlog = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const blogData = {
            title: form.title.value,
            thumbnail: form.thumbnail.value,
            content: form.content.value,
            status: 'draft',
        };

        const res = await axios.post('http://localhost:3000/blogs', blogData);
        if (res.data.insertedId) {
            toast.success("Blog created as Draft!");
            form.reset();
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Add New Blog</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="title" type="text" placeholder="Blog Title" className="input input-bordered w-full" required />
                <input name="thumbnail" type="text" placeholder="Thumbnail URL" className="input input-bordered w-full" required />
                <textarea name="content" placeholder="Write your blog content here..." className="textarea textarea-bordered w-full h-40" required></textarea>
                <button type="submit" className="btn btn-primary w-full">Create Blog</button>
            </form>
        </div>
    );
};

export default AddBlog;