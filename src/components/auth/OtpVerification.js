// // src/components/auth/OtpVerification.js
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const OtpVerification = () => {
//     const [username, setUsername] = useState("");
//     const [otp, setOtp] = useState("");
//     const [errorMessage, setErrorMessage] = useState("");
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post(`http://localhost:8080/api/users/verify-otp/${username}`, { otp });
//             navigate("/login"); // Redirect to login page
//         } catch (err) {
//             console.error(err);
//             setErrorMessage("Invalid OTP. Please try again.");
//         }
//     };

//     return (
//         <div className="form-container">
//             <h2>OTP Verification</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     placeholder="Username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="text"
//                     placeholder="Enter OTP"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                     required
//                 />
//                 <button type="submit">Verify OTP</button>
//             </form>
//             {errorMessage && <p className="error">{errorMessage}</p>}
//         </div>
//     );
// };

// export default OtpVerification;

// src/components/auth/OtpVerification.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Added import
import './OtpVerification.css'; // Import the CSS file for styling

const OtpVerification = () => {
    const [username, setUsername] = useState("");
    const [otp, setOtp] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [formErrors, setFormErrors] = useState({ username: "", otp: "" });

    const navigate = useNavigate(); // Added navigate hook

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "username") {
            setUsername(value);
        } else {
            setOtp(value);
        }
        setFormErrors({ ...formErrors, [name]: "" }); // Clear the error when the user starts typing
    };

    const validateForm = () => {
        let valid = true;
        const errors = { username: "", otp: "" };

        if (!username) {
            errors.username = "Username is required.";
            valid = false;
        }
        if (!otp) {
            errors.otp = "OTP is required.";
            valid = false;
        }

        setFormErrors(errors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await axios.post(`http://localhost:8080/api/users/verify-otp/${username}`, { otp });
                setErrorMessage(""); // Clear error message
                // Navigate to the login page after successful OTP verification
                navigate("/login");
            } catch (err) {
                setErrorMessage("Invalid OTP. Please try again.");
            }
        }
    };

    return (
        <div className="otp-verification-container">
            <div className="form-wrapper">
                <h2>OTP Verification</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={username}
                            onChange={handleChange}
                            className={formErrors.username ? "invalid" : ""}
                        />
                        {formErrors.username && <p className="error">{formErrors.username}</p>}
                    </div>

                    <div className="input-container">
                        <input
                            type="text"
                            name="otp"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={handleChange}
                            className={formErrors.otp ? "invalid" : ""}
                        />
                        {formErrors.otp && <p className="error">{formErrors.otp}</p>}
                    </div>

                    <button type="submit" className="submit-btn">Verify OTP</button>
                </form>

                {/* Display error message */}
                {errorMessage && <p className="error">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default OtpVerification;
