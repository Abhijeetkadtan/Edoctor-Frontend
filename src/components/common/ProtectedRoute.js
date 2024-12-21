import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useContext(AuthContext);
    console.log('User:', user);
    console.log("Allowed Roles:", allowedRoles);


    // If the user is not logged in, redirect to the login page
    if (!user) {
        return <Navigate to="/" replace />;
    }

    // If the user's role is not in the allowed roles, redirect to /unauthorized
    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    // Render the component if user is authorized
    return children;
};

export default ProtectedRoute;