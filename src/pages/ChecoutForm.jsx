import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../provider/AuthProvider";
import Swal from "sweetalert2";

const CheckoutForm = ({ price }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState("");

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post("/create-payment-intent", { price: price })
                .then(res => setClientSecret(res.data.clientSecret));
        }
    }, [axiosSecure, price]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (card == null) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card });

        if (error) {
            console.log('Error', error);
            Swal.fire("Error", error.message, "error");
        } else {
            // পেমেন্ট কনফার্ম করা
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'anonymous',
                        name: user?.displayName || 'anonymous'
                    }
                }
            });

            if (confirmError) {
                console.log('Confirm Error');
            } else if (paymentIntent.status === "succeeded") {
                setTransactionId(paymentIntent.id);
                
                // ডাটাবেসে পেমেন্ট ডাটা সেভ করা
                const paymentInfo = {
                    email: user.email,
                    price,
                    transactionId: paymentIntent.id,
                    date: new Date(), // UTC date convert if needed
                    status: 'success'
                };

                const res = await axiosSecure.post('/payments', paymentInfo);
                if (res.data?.insertedId) {
                    Swal.fire("Success!", `Transaction ID: ${paymentIntent.id}`, "success");
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded-xl shadow-inner bg-gray-50">
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': { color: '#aab7c4' },
                        },
                        invalid: { color: '#9e2146' },
                    },
                }}
            />
            <button className="btn btn-error btn-block mt-6 text-white" type="submit" disabled={!stripe || !clientSecret}>
                Donate ${price}
            </button>
            {transactionId && <p className="text-green-600 mt-2">Your Transaction ID: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;