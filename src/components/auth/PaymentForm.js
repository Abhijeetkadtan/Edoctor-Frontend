// import React from "react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import axios from "axios";

// const PaymentForm = ({ amount, onSuccess }) => {
//     const stripe = useStripe();
//     const elements = useElements();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const { data: { clientSecret } } = await axios.post("http://localhost:8080/api/payments/create-payment-intent", {
//                 amount: amount * 100,
//             });

//             const result = await stripe.confirmCardPayment(clientSecret, {
//                 payment_method: {
//                     card: elements.getElement(CardElement),
//                 },
//             });

//             if (result.error) {
//                 alert("Payment failed: " + result.error.message);
//             } else {
//                 alert("Payment successful!");
//                 onSuccess(result.paymentIntent.id); // Send payment ID back to parent
//             }
//         } catch (error) {
//             console.error("Error during payment: ", error);
//             alert("Failed to process payment.");
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <CardElement />
//             <button type="submit" disabled={!stripe}>Pay Now</button>
//         </form>
//     );
// };

// export default PaymentForm;

import React from "react";
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import "./PaymentForm.css";

const PaymentForm = ({ amount, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data: { clientSecret } } = await axios.post(
                "http://localhost:8080/api/payments/create-payment-intent",
                { amount: amount * 100 } // Amount in cents
            );

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                },
            });

            if (result.error) {
                alert("Payment failed: " + result.error.message);
            } else {
                alert("Payment successful!");
                onSuccess(result.paymentIntent.id); // Pass payment ID to parent
            }
        } catch (error) {
            console.error("Error creating payment intent:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="payment-container">
            <h3>Amount to Pay: ${amount}</h3>
            <form onSubmit={handleSubmit}>
                <div className="card-field">
                    <label>Card Number</label>
                    <CardNumberElement className="card-input" />
                </div>
                <div className="card-field">
                    <label>Expiry Date</label>
                    <CardExpiryElement className="card-input" />
                </div>
                <div className="card-field">
                    <label>CVC</label>
                    <CardCvcElement className="card-input" />
                </div>
                <button type="submit" disabled={!stripe}>
                    Pay Now
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;
