
// import React from "react";
// import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import axios from "axios";
// import "./PaymentForm.css";

// const PaymentForm = ({ amount, onSuccess }) => {
//     const stripe = useStripe();
//     const elements = useElements();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const { data: { clientSecret } } = await axios.post(
//                 "http://localhost:8080/api/payments/create-payment-intent",
//                 { amount: amount * 100 } // Amount in cents
//             );

//             const result = await stripe.confirmCardPayment(clientSecret, {
//                 payment_method: {
//                     card: elements.getElement(CardNumberElement),
//                 },
//             });

//             if (result.error) {
//                 alert("Payment failed: " + result.error.message);
//             } else {
//                 alert("Payment successful!");
//                 onSuccess(result.paymentIntent.id); // Pass payment ID to parent
//             }
//         } catch (error) {
//             console.error("Error creating payment intent:", error);
//             alert("An error occurred. Please try again.");
//         }
//     };

//     return (
//         <div className="payment-container">
//             <h3>Amount to Pay: ${amount}</h3>
//             <form onSubmit={handleSubmit}>
//                 <div className="card-field">
//                     <label>Card Number</label>
//                     <CardNumberElement className="card-input" />
//                 </div>
//                 <div className="card-field">
//                     <label>Expiry Date</label>
//                     <CardExpiryElement className="card-input" />
//                 </div>
//                 <div className="card-field">
//                     <label>CVC</label>
//                     <CardCvcElement className="card-input" />
//                 </div>
//                 <button type="submit" disabled={!stripe}>
//                     Pay Now
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default PaymentForm;


import React, { useState } from "react";
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import Lottie from "react-lottie";
import axios from "axios";
import successAnimation from "./success-animation.json"; // Add your success animation JSON file
import "./PaymentForm.css";

const PaymentForm = ({ amount, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentStatus, setPaymentStatus] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            alert("Stripe has not been loaded yet.");
            return;
        }

        setIsLoading(true);

        try {
            // Fetch client secret from the backend
            const { data: { clientSecret } } = await axios.post(
                "http://localhost:8080/api/payments/create-payment-intent",
                { amount: amount * 100 } // Amount in cents
            );

            // Confirm payment using Stripe's Card Elements
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                },
            });

            if (result.error) {
                setPaymentStatus(`Payment failed: ${result.error.message}`);
            } else if (result.paymentIntent.status === "succeeded") {
                setPaymentStatus("Payment successful!");
                setIsSuccess(true);
                onSuccess(result.paymentIntent.id);
            }
        } catch (error) {
            setPaymentStatus("Payment failed. Please try again.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const cardStyle = {
        style: {
            base: {
                fontSize: "16px",
                color: "#424770",
                letterSpacing: "0.025em",
                fontFamily: "Arial, sans-serif",
                "::placeholder": { color: "#aab7c4" },
            },
            invalid: { color: "#9e2146" },
        },
    };

    const successOptions = {
        loop: false,
        autoplay: true,
        animationData: successAnimation,
    };

    return (
        <div className="payment-form-container">
            {isSuccess ? (
                <div className="success-animation">
                    <Lottie options={successOptions} height={200} width={200} />
                    <h3>Payment Successful!</h3>
                </div>
            ) : (
                <>
                    <h2>Payment Details</h2>
                    <p>Amount to Pay: <strong>${amount}</strong></p>
                    <form onSubmit={handleSubmit} className="payment-form">
                        <div className="card-input-container">
                            <label>Card Number</label>
                            <CardNumberElement options={cardStyle} />
                        </div>
                        <div className="card-input-container">
                            <label>Expiry Date</label>
                            <CardExpiryElement options={cardStyle} />
                        </div>
                        <div className="card-input-container">
                            <label>CVC</label>
                            <CardCvcElement options={cardStyle} />
                        </div>
                        <button type="submit" disabled={!stripe || isLoading} className="pay-button">
                            {isLoading ? "Processing..." : "Pay Now"}
                        </button>
                    </form>
                    {paymentStatus && <p className="payment-status">{paymentStatus}</p>}
                </>
            )}
        </div>
    );
};

export default PaymentForm;
