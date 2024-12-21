// // src/components/dashboard/DoctorDashboard.js
// import React from "react";
// import { Link } from "react-router-dom";
// import './Dashboard.css'; // Import CSS for styling

// const DoctorDashboard = () => {
//     return (
//         <div className="dashboard">
//             <h1>Doctor Dashboard</h1>
//             <Link to="/profile">Edit Profile</Link>
//             <Link to="/availability">Set Availability</Link>
//             <Link to="/appointments/manage">Manage Appointments</Link>
//         </div>
//     );
// };

// export default DoctorDashboard;

// src/components/dashboard/DoctorDashboard.js
import React from "react";
import { Link } from "react-router-dom";
import './Dashboard.css'; // Reuse the CSS for styling

const DoctorDashboard = () => {
    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Doctor Dashboard</h1>
            <div className="dashboard-links">
                <Link to="/profile" className="dashboard-link">
                    Edit Profile
                </Link>
                <Link to="/availability" className="dashboard-link">
                    Set Availability
                </Link>
                <Link to="/appointments/manage" className="dashboard-link">
                    Manage Appointments
                </Link>
            </div>
        </div>
    );
};

export default DoctorDashboard;
