import { Link } from "react-router";

const Banner = () => {
    return (
        <div className="hero min-h-[550px]" style={{ backgroundImage: "url('https://ibb.co.com/j99T2wWt')" }}>
            <div className="hero-overlay bg-opacity-70 bg-red-900"></div>
            <div className="hero-content text-center text-white">
                <div className="max-w-2xl">
                    <h1 className="mb-5 text-5xl font-bold uppercase">Save a Life, Donate Blood</h1>
                    <p className="mb-8 text-lg">আপনার এক ব্যাগ রক্ত বাঁচাতে পারে একটি প্রাণ। আজই আমাদের সাথে যুক্ত হন।</p>
                    <div className="flex gap-4 justify-center">
                        <Link to="/signup" className="btn btn-error text-white border-none px-8">Join as Donor</Link>
                        <Link to="/search" className="btn btn-outline btn-white text-white px-8">Search Donors</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;