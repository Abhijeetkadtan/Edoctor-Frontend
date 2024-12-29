
// import React from "react";
// import { Link } from "react-router-dom";
// import './Dashboard.css'; // Import CSS for styling

// const PatientDashboard = () => {
//     return (
//         <div className="dashboard-container">
//             <h1 className="dashboard-title">Patient Dashboard</h1>
//             <div className="dashboard-links">
//                 <Link to="/doctors" className="dashboard-link">
//                     View All Doctors
//                 </Link>
//                 <Link to="/appointments/schedule" className="dashboard-link">
//                     Schedule Appointment
//                 </Link>
//                 <Link to="/appointments/manage" className="dashboard-link">
//                     Manage Appointments
//                 </Link>
//                 <Link to="/profile" className="dashboard-link">
//                     Edit Profile
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default PatientDashboard;



import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Dashboard.css';
import { AuthContext } from "../../context/AuthContext"; // Assuming AuthContext is implemented

const PatientDashboard = () => {
    const { user } = useContext(AuthContext); // Get user from AuthContext
    const [patientName, setPatientName] = useState("");

    useEffect(() => {
        if (user?.username) {
            setPatientName(user.username); // Use name from AuthContext if available
        } else {
            // Fetch user details if not already in context
            fetchUserName();
        }
    }, [user]);

    const fetchUserName = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/users/me", {
                headers: {
                    Authorization: `Bearer ${user.token}`, // Replace with your auth method
                },
            });
            const data = await response.json();
            setPatientName(data.name); // Assuming the response contains a 'name' field
        } catch (error) {
            console.error("Error fetching user name:", error);
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-hero">
                <h1>Welcome Back, {patientName || "Patient"}!</h1>
                <p>Your health journey starts here. What would you like to do today?</p>
            </div>
            <div className="dashboard-cards">
                <div className="card">
                    <h3>View All Doctors</h3>
                    <p>Browse through our list of experienced doctors and specialists.</p>
                    <Link to="/doctors" className="card-button">Explore Doctors</Link>
                </div>
                <div className="card">
                    <h3>Schedule Appointment</h3>
                    <p>Pick a date and time that suits you to see your preferred doctor.</p>
                    <Link to="/appointments/schedule" className="card-button">Book Now</Link>
                </div>
                <div className="card">
                    <h3>Manage Appointments</h3>
                    <p>Check, reschedule, or cancel your upcoming appointments.</p>
                    <Link to="/appointments/manage" className="card-button">Manage Appointments</Link>
                </div>
                <div className="card">
                    <h3>Edit Profile</h3>
                    <p>Keep your personal information up-to-date for better service.</p>
                    <Link to="/profile" className="card-button">Edit Profile</Link>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;
