import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ContactUs = () => {
    useEffect(() => {
        AOS.refresh();
    }, []);

    const handleContactSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        toast.success("Thank you! Your message has been sent.");
        form.reset();
    };

    return (
        <div className="bg-gray-50 min-h-screen py-16 overflow-x-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16" data-aos="fade-down">
                    <h2 className="text-4xl font-extrabold text-gray-800 uppercase tracking-wide">Contact Us</h2>
                    <p className="text-gray-600 mt-4 max-w-xl mx-auto">
                        আপনার কোনো প্রশ্ন থাকলে বা সাহায্যের প্রয়োজন হলে নিচের ফর্মটি পূরণ করুন। আমাদের টিম দ্রুত আপনার সাথে যোগাযোগ করবে।
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div data-aos="zoom-out-right">
                        <div className="space-y-8">
                            <div className="bg-white p-8 shadow-lg rounded-2xl border-l-8 border-red-600">
                                <h3 className="text-2xl font-bold mb-6 text-gray-800">Our Office</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                        </div>
                                        <p className="text-gray-700 font-medium"> Mirsarai, Chattogram, Bangladesh</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                            </svg>
                                        </div>
                                        <p className="text-gray-700 font-medium">+880 1234 567890</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                            </svg>
                                        </div>
                                        <p className="text-gray-700 font-medium">support@blooddonation.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div data-aos="zoom-out-left">
                        <div className="bg-white p-10 shadow-2xl rounded-3xl border border-gray-100">
                            <h3 className="text-2xl font-bold mb-8 text-gray-800">Send a Message</h3>
                            <form onSubmit={handleContactSubmit} className="space-y-6">
                                <div className="form-control">
                                    <label className="label font-semibold">Full Name</label>
                                    <input type="text" placeholder="Your Name" className="input input-bordered focus:border-red-500" required />
                                </div>
                                <div className="form-control">
                                    <label className="label font-semibold">Email Address</label>
                                    <input type="email" placeholder="Your Email" className="input input-bordered focus:border-red-500" required />
                                </div>
                                <div className="form-control">
                                    <label className="label font-semibold">Subject</label>
                                    <input type="text" placeholder="Topic of Message" className="input input-bordered focus:border-red-500" required />
                                </div>
                                <div className="form-control">
                                    <label className="label font-semibold">Message</label>
                                    <textarea className="textarea textarea-bordered h-32 focus:border-red-500" placeholder="Type your message here..." required></textarea>
                                </div>
                                <button type="submit" className="btn btn-error w-full text-white font-bold text-lg shadow-lg">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;