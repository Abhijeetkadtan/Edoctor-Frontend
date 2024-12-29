

import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    // Validate form fields
    const validateForm = () => {
        let isValid = true;

        // Reset error states
        setUsernameError(false);
        setPasswordError(false);

        if (username.trim() === "") {
            setUsernameError(true);
            isValid = false;
        }

        if (password.trim() === "") {
            setPasswordError(true);
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
            const response = await axios.post("http://localhost:8080/api/users/login", {
                username,
                password,
            });

            setUser({
                username,
                password,
                role: response.data.role,
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

        <div className="login-container">
            <div className="form-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={usernameError ? "input-error" : ""}
                        />
                        {usernameError && <p className="error">Username is required.</p>}
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={passwordError ? "input-error" : ""}
                        />
                        {passwordError && <p className="error">Password is required.</p>}
                    </div>
                    <button type="submit">Login</button>
                </form>

                {errorMessage && <p className="error">{errorMessage}</p>}

                <p>
                    <Link to="/forgot-password">Forgot your password?</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
