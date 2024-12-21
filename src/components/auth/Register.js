// // src/components/auth/Register.js
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//     const [formData, setFormData] = useState({
//         username: "",
//         password: "",
//         email: "",
//         role: "PATIENT",
//     });
//     const [errorMessage, setErrorMessage] = useState("");
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post("http://localhost:8080/api/users/register", formData);
//             navigate("/verify-otp"); // Redirect to OTP verification page
//         } catch (err) {
//             console.error(err);
//             setErrorMessage("Registration failed. Please try again.");
//         }
//     };

//     return (
//         <div className="form-container">
//             <h2>Register</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     name="username"
//                     placeholder="Username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     required
//                 />
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                 />
//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                 />
//                 <select name="role" value={formData.role} onChange={handleChange}>
//                     <option value="PATIENT">Patient</option>
//                     <option value="DOCTOR">Doctor</option>
//                 </select>
//                 <button type="submit">Register</button>
//             </form>
//             {errorMessage && <p className="error">{errorMessage}</p>}
//         </div>
//     );
// };

// export default Register;

// src/components/auth/Register.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Register.css'; // Import the CSS file for styling

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        role: "PATIENT",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [formErrors, setFormErrors] = useState({
        username: "",
        password: "",
        email: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear error message for the respective field when user starts typing
        setFormErrors({ ...formErrors, [name]: "" });
    };

    const validateForm = () => {
        let valid = true;
        const errors = { username: "", password: "", email: "" };

        // Username validation
        if (!formData.username) {
            errors.username = "Username is required.";
            valid = false;
        } else if (formData.username.length < 3) {
            errors.username = "Username must be at least 3 characters.";
            valid = false;
        }

        // Email validation
        if (!formData.email) {
            errors.email = "Email is required.";
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is not valid.";
            valid = false;
        }

        // Password validation
        if (!formData.password) {
            errors.password = "Password is required.";
            valid = false;
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters.";
            valid = false;
        }

        setFormErrors(errors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the browser's default form submission

        // Only proceed if the form is valid
        if (validateForm()) {
            try {
                await axios.post("http://localhost:8080/api/users/register", formData);
                navigate("/verify-otp"); // Redirect to OTP verification page
            } catch (err) {
                console.error(err);
                setErrorMessage("Registration failed. Please try again.");
            }
        } else {
            setErrorMessage("Please fill in the form correctly.");
        }
    };

    return (
        <div className="register-container">
            <div className="form-wrapper">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            className={formErrors.username ? 'invalid' : ''}
                        />
                        {formErrors.username && <p className="error">{formErrors.username}</p>}
                    </div>

                    <div className="input-container">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className={formErrors.email ? 'invalid' : ''}
                        />
                        {formErrors.email && <p className="error">{formErrors.email}</p>}
                    </div>

                    <div className="input-container">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className={formErrors.password ? 'invalid' : ''}
                        />
                        {formErrors.password && <p className="error">{formErrors.password}</p>}
                    </div>

                    <div className="input-container">
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="PATIENT">Patient</option>
                            <option value="DOCTOR">Doctor</option>
                        </select>
                    </div>

                    <button type="submit" className="submit-btn">Register</button>
                </form>
                {errorMessage && <p className="error">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default Register;
