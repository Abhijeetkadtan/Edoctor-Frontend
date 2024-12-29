// src/components/admin/AdminDashboard.js
import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import "./AdminDashboard.css";

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <AdminNavbar />
            <div className="admin-content">
                <Outlet /> {/* This is where nested routes will render */}
            </div>
        </div>
    );
};

export default AdminDashboard;
