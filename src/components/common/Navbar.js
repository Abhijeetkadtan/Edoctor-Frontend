// // src/components/common/Navbar.js
// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext"; // Import the AuthContext
// import './Navbar.css'; // Import CSS file for styling

// const Navbar = () => {
//     const { user, setUser } = useContext(AuthContext); // Destructure user and setUser from context

//     const handleLogout = () => {
//         setUser(null); // Clear user state on logout
//         // Optionally, clear any tokens stored in local storage/session storage if applicable
//         localStorage.removeItem('token'); // Example for token handling
//         // Redirect to home or login page if desired
//     };
//     return (
//         <nav>
//             <Link to="/">Home</Link>
//             {user ? (
//                 <>
//                     <Link> {user.username}</Link> {/* Display username */}
//                     <Link onClick={handleLogout}>Logout</Link> {/* Logout button */}
//                 </>
//             ) : (
//                 <>
//                     <Link to="/login">Login</Link>
//                     <Link to="/register">Register</Link>
//                 </>
//             )}
//             {/* Additional links based on user role can be added here */}
//         </nav>
//     );
// };

// export default Navbar;


import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; // Import the AuthContext
import './Navbar.css'; // Import CSS file for styling

const Navbar = () => {
    const { user, setUser } = useContext(AuthContext); // Destructure user and setUser from context

    const handleLogout = () => {
        setUser(null); // Clear user state on logout
        localStorage.removeItem('token'); // Clear token
    };

    return (
        <nav>
            <Link to="/">Home</Link> {/* Logo or left-side link */}
            <div>
                {user ? (
                    <>
                        <Link>{user.username}</Link> {/* Display username */}
                        <Link onClick={handleLogout}>Logout</Link> {/* Logout button */}
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
