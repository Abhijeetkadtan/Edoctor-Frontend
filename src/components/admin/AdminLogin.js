import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; // Import AuthContext
import "./AdminLogin.css";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext); // Get setUser from context

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const credentials = btoa(`${username}:${password}`);
            const response = await axios.post('http://localhost:8080/api/admins/login', null, {
                headers: {
                    'Authorization': `Basic ${credentials}`
                }
            });

            setMessage("Login successful!");
            const adminData = { username, role: "ADMIN" }; // Adjust this based on response
            localStorage.setItem("admin", JSON.stringify(adminData)); // Store user data
            setUser(adminData); // Set user in AuthContext

            // Redirect to the admin dashboard
            navigate("/admin-dashboard");
        } catch (error) {
            setMessage("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="admin-login">
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AdminLogin;
