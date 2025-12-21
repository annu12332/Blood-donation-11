import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../pages/CheckoutForm";
import { useState } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Funding = () => {
    const [donationAmount, setDonationAmount] = useState(0);
    const [showPayment, setShowPayment] = useState(false);

    const handleProceed = (e) => {
        e.preventDefault();
        const amount = e.target.amount.value;
        if (amount > 0) {
            setDonationAmount(amount);
            setShowPayment(true);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-red-600">Give Funds for Humanity</h2>
            
            {!showPayment ? (
                <div className="card bg-white shadow-xl p-10 border">
                    <form onSubmit={handleProceed} className="space-y-4">
                        <label className="label font-bold">Enter Donation Amount ($)</label>
                        <input 
                            name="amount"
                            type="number" 
                            placeholder="e.g. 20" 
                            className="input input-bordered w-full" 
                            required 
                        />
                        <button type="submit" className="btn btn-error btn-block text-white">Proceed to Pay</button>
                    </form>
                </div>
            ) : (
                <div className="card bg-white shadow-xl p-10 border">
                    <h3 className="text-xl font-bold mb-4 text-gray-700">Donating: ${donationAmount}</h3>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm price={donationAmount} />
                    </Elements>
                    <button onClick={() => setShowPayment(false)} className="btn btn-link text-gray-500 mt-4">Change Amount</button>
                </div>
            )}
        </div>
    );
};

export default Funding;