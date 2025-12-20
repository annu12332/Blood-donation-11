import Banner from "../components/Banner";
import ContactUs from "../components/ContactUs";

const Home = () => {
    return (
        <div>
            <Banner />
            
            
            <div className="py-20 bg-gray-50 text-center px-4">
                <h2 className="text-3xl font-bold mb-10 text-gray-800 uppercase">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 container mx-auto">
                   <div className="p-8 bg-white shadow-md rounded-lg border-b-4 border-red-500">
                        <h3 className="font-bold text-lg mb-2">Easy Search</h3>
                        <p>মুহূর্তেই আপনার এলাকায় রক্তদাতা খুঁজে বের করুন।</p>
                   </div>
                   <div className="p-8 bg-white shadow-md rounded-lg border-b-4 border-red-500">
                        <h3 className="font-bold text-lg mb-2">Quick Request</h3>
                        <p>জরুরি প্রয়োজনে রক্তের জন্য আবেদন করুন সহজে।</p>
                   </div>
                   <div className="p-8 bg-white shadow-md rounded-lg border-b-4 border-red-500">
                        <h3 className="font-bold text-lg mb-2">Secure Data</h3>
                        <p>আপনার ব্যক্তিগত তথ্য আমাদের কাছে সুরক্ষিত।</p>
                   </div>
                </div>
            </div>

            <ContactUs />
        </div>
    );
};

export default Home;