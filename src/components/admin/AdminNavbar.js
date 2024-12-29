import React from "react";
import { Link } from "react-router-dom";
import "./AdminNavbar.css";

const AdminNavbar = () => {
    return (
        <nav className="admin-navbar">
            <ul>
                <li>
                    <Link to="/admin-dashboard/users">User Management</Link>
                </li>
                <li>
                    <Link to="/admin-dashboard/doctors">Doctor Management</Link>
                </li>
                <li>
                    <Link to="/admin-dashboard/appointments">Appointment Management</Link>
                </li>
            </ul>
        </nav>
    );
};

export default AdminNavbar;
