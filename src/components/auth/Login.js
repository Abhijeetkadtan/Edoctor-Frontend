
// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";

// const Login = () => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [errorMessage, setErrorMessage] = useState("");
//     const { setUser } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             // Mock login request for role (replace with actual backend endpoint)
//             const response = await axios.post("http://localhost:8080/api/users/login", {
//                 username,
//                 password,
//             });

//             setUser({
//                 username,
//                 password,
//                 role: response.data.role, // Save the user's role (e.g., "DOCTOR")
//             });
//             localStorage.setItem("user", JSON.stringify({ username, role: response.data.role }));
//             // Redirect based on role
//             if (response.data.role === "DOCTOR") {
//                 navigate("/doctor-dashboard");
//             } else if (response.data.role === "PATIENT") {
//                 navigate("/patient-dashboard");
//             }
//         } catch (error) {
//             console.error("Login failed:", error);
//             setErrorMessage("Invalid credentials.");
//         }
//     };

//     return (
//         <div className="form-container">
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     placeholder="Username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//                 <button type="submit">Login</button>
//             </form>
//             {/* Display error message */}
//             {errorMessage && <p className="error">{errorMessage}</p>}

//             {/* Forgot Password link */}
//             <p>
//                 <Link to="/forgot-password">Forgot your password?</Link> {/* Link to Forgot Password page */}
//             </p>
//         </div>
//     );
// };

// export default Login;


// // src/components/auth/Login.js
// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
// import './Login.css'; // Import the CSS file for styling

// const Login = () => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [errorMessage, setErrorMessage] = useState("");
//     const [formErrors, setFormErrors] = useState({ username: "", password: "" });
//     const { setUser } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         if (name === "username") setUsername(value);
//         if (name === "password") setPassword(value);

//         // Clear error message for the respective field when user starts typing
//         setFormErrors({ ...formErrors, [name]: "" });
//     };

//     const validateForm = () => {
//         let valid = true;
//         const errors = { username: "", password: "" };

//         if (!username) {
//             errors.username = "Username is required.";
//             valid = false;
//         }

//         if (!password) {
//             errors.password = "Password is required.";
//             valid = false;
//         }

//         setFormErrors(errors);
//         return valid;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (validateForm()) {
//             try {
//                 const response = await axios.post("http://localhost:8080/api/users/login", {
//                     username,
//                     password,
//                 });

//                 setUser({
//                     username,
//                     role: response.data.role,
//                 });
//                 localStorage.setItem("user", JSON.stringify({ username, role: response.data.role }));

//                 // Redirect based on role
//                 if (response.data.role === "DOCTOR") {
//                     navigate("/doctor-dashboard");
//                 } else if (response.data.role === "PATIENT") {
//                     navigate("/patient-dashboard");
//                 }
//             } catch (error) {
//                 console.error("Login failed:", error);
//                 setErrorMessage("Invalid credentials.");
//             }
//         } else {
//             setErrorMessage("Please fill in the form correctly.");
//         }
//     };

//     return (
//         <div className="login-container">
//             <div className="form-wrapper">
//                 <h2>Login</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="input-container">
//                         <input
//                             type="text"
//                             name="username"
//                             placeholder="Username"
//                             value={username}
//                             onChange={handleChange}
//                             className={formErrors.username ? "invalid" : ""}
//                         />
//                         {formErrors.username && <p className="error">{formErrors.username}</p>}
//                     </div>

//                     <div className="input-container">
//                         <input
//                             type="password"
//                             name="password"
//                             placeholder="Password"
//                             value={password}
//                             onChange={handleChange}
//                             className={formErrors.password ? "invalid" : ""}
//                         />
//                         {formErrors.password && <p className="error">{formErrors.password}</p>}
//                     </div>

//                     <button type="submit" className="submit-btn">Login</button>
//                 </form>
//                 {errorMessage && <p className="error">{errorMessage}</p>}

//                 <p>
//                     <Link to="/forgot-password">Forgot your password?</Link>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Login;
// src/components/auth/Login.js
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    // Validate form fields
    const validateForm = () => {
        let isValid = true;

        // Reset error messages
        setUsernameError("");
        setPasswordError("");

        if (username.trim() === "") {
            setUsernameError("Username is required.");
            isValid = false;
        }

        if (password.trim() === "") {
            setPasswordError("Password is required.");
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form before submitting
        if (!validateForm()) {
            return; // If validation fails, do not proceed
        }

        try {
            // Mock login request for role (replace with actual backend endpoint)
            const response = await axios.post("http://localhost:8080/api/users/login", {
                username,
                password,
            });

            setUser({
                username,
                password,
                role: response.data.role, // Save the user's role (e.g., "DOCTOR")
            });
            localStorage.setItem("user", JSON.stringify({ username, role: response.data.role }));

            // Redirect based on role
            if (response.data.role === "DOCTOR") {
                navigate("/doctor-dashboard");
            } else if (response.data.role === "PATIENT") {
                navigate("/patient-dashboard");
            }
        } catch (error) {
            console.error("Login failed:", error);
            setErrorMessage("Invalid credentials.");
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {usernameError && <p className="error">{usernameError}</p>} {/* Show username error */}
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && <p className="error">{passwordError}</p>} {/* Show password error */}
                </div>
                <button type="submit">Login</button>
            </form>

            {/* Display generic error message */}
            {errorMessage && <p className="error">{errorMessage}</p>}

            {/* Forgot Password link */}
            <p>
                <Link to="/forgot-password">Forgot your password?</Link> {/* Link to Forgot Password page */}
            </p>
        </div>
    );
};

export default Login;
