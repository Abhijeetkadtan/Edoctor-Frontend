// // src/components/dashboard/PatientDashboard.js
// import React from "react";
// import { Link } from "react-router-dom";
// import './Dashboard.css'; // Import CSS for styling

// const PatientDashboard = () => {
//     return (
//         <div className="dashboard">
//             <h1>Patient Dashboard</h1>
//             <Link to="/doctors">View All Doctors</Link>
//             <Link to="/appointments/schedule">Schedule Appointment</Link>
//             <Link to="/appointments/manage">Manage Appointments</Link>
//             <Link to="/profile">Edit Profile</Link>
//         </div>
//     );
// };

// export default PatientDashboard;

// src/components/dashboard/PatientDashboard.js
import React from "react";
import { Link } from "react-router-dom";
import './Dashboard.css'; // Import CSS for styling

const PatientDashboard = () => {
    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Patient Dashboard</h1>
            <div className="dashboard-links">
                <Link to="/doctors" className="dashboard-link">
                    View All Doctors
                </Link>
                <Link to="/appointments/schedule" className="dashboard-link">
                    Schedule Appointment
                </Link>
                <Link to="/appointments/manage" className="dashboard-link">
                    Manage Appointments
                </Link>
                <Link to="/profile" className="dashboard-link">
                    Edit Profile
                </Link>
            </div>
        </div>
    );
};

export default PatientDashboard;
