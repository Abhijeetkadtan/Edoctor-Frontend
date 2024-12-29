
// import React from "react";
// import { Link } from "react-router-dom";
// import './Dashboard.css'; // Reuse the CSS for styling

// const DoctorDashboard = () => {
//     return (
//         <div className="dashboard-container">
//             <h1 className="dashboard-title">Doctor Dashboard</h1>
//             <div className="dashboard-links">
//                 <Link to="/profile" className="dashboard-link">
//                     Edit Profile
//                 </Link>
//                 <Link to="/availability" className="dashboard-link">
//                     Set Availability
//                 </Link>
//                 <Link to="/appointments/manage" className="dashboard-link">
//                     Manage Appointments
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default DoctorDashboard;




import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Dashboard.css';
import { AuthContext } from "../../context/AuthContext"; // Assuming AuthContext provides user details

const DoctorDashboard = () => {
    const { user } = useContext(AuthContext); // Get the logged-in user details
    const [doctorName, setDoctorName] = useState("");

    useEffect(() => {
        if (user?.username) {
            setDoctorName(user.username); // Use name from AuthContext if available
        } else {
            fetchDoctorName();
        }
    }, [user]);

    const fetchDoctorName = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/users/me", {
                headers: {
                    Authorization: `Bearer ${user.token}`, // Replace with your auth method
                },
            });
            const data = await response.json();
            setDoctorName(data.name); // Assuming the response contains a 'name' field
        } catch (error) {
            console.error("Error fetching doctor name:", error);
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-hero">
                <h1>Welcome, Dr. {doctorName || "Doctor"}!</h1>
                <p>Your dashboard is ready to help you manage your practice efficiently.</p>
            </div>
            <div className="dashboard-cards">
                <div className="card">
                    <h3>Edit Profile</h3>
                    <p>Update your personal and professional information for patients.</p>
                    <Link to="/profile" className="card-button">Edit Profile</Link>
                </div>
                <div className="card">
                    <h3>Set Availability</h3>
                    <p>Manage your schedule to let patients know when you're available.</p>
                    <Link to="/availability" className="card-button">Set Availability</Link>
                </div>
                <div className="card">
                    <h3>Manage Appointments</h3>
                    <p>Review, accept, or cancel upcoming patient appointments.</p>
                    <Link to="/appointments/manage" className="card-button">Manage Appointments</Link>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
