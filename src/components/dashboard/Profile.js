// // src/components/dashboard/Profile.js
// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "../../context/AuthContext";

// const Profile = () => {
//     const { user } = useContext(AuthContext);
//     const [userDetails, setUserDetails] = useState(null);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8080/api/users/username/${user.username}`, { // Updated URL
//                     headers: {
//                         Authorization: `Basic ${btoa(`${user.username}:${user.password}`)}`,
//                     },
//                 });
//                 setUserDetails(response.data);
//             } catch (error) {
//                 console.error("Error fetching user profile", error);
//                 setError("Failed to fetch user profile.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (user) {
//             fetchUserProfile();
//         }
//     }, [user]);

//     const handleUpdateProfile = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.put(`http://localhost:8080/api/users/${userDetails.id}`, userDetails, {
//                 headers: {
//                     Authorization: `Basic ${btoa(`${user.username}:${user.password}`)}`,
//                 },
//             });
//             alert("Profile updated successfully!");
//         } catch (error) {
//             console.error("Error updating profile", error);
//             setError("Failed to update profile.");
//         }
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div className="error">{error}</div>;
//     }

//     if (!userDetails) {
//         return <div>No user details available.</div>;
//     }

//     return (
//         <div>
//             <h2>Your Profile</h2>
//             <form onSubmit={handleUpdateProfile}>
//                 {user.role === "PATIENT" ? (
//                     <>
//                         <h3>Patient Details</h3>
//                         <input
//                             type="text"
//                             value={userDetails.username}
//                             onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
//                             required
//                         />
//                         <input
//                             type="email"
//                             value={userDetails.email}
//                             onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
//                             required
//                         />
//                         <input
//                             type="text"
//                             value={userDetails.medicalHistory || ""}
//                             onChange={(e) => setUserDetails({ ...userDetails, medicalHistory: e.target.value })}
//                             placeholder="Medical History"
//                         />
//                     </>
//                 ) : user.role === "DOCTOR" ? (
//                     <>
//                         <h3>Doctor Details</h3>
//                         <input
//                             type="text"
//                             value={userDetails.username}
//                             onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
//                             required
//                         />
//                         <input
//                             type="email"
//                             value={userDetails.email}
//                             onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
//                             required
//                         />
//                         <input
//                             type="text"
//                             value={userDetails.specialization || ""}
//                             onChange={(e) => setUserDetails({ ...userDetails, specialization: e.target.value })}
//                             placeholder="Specialization"
//                         />
//                     </>
//                 ) : (
//                     <div>Unknown user role.</div>
//                 )}
//                 <button type="submit">Update Profile</button>
//             </form>
//         </div>
//     );
// };

// export default Profile;

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import './Profile.css'; // Assuming this file exists

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/users/username/${user.username}`, {
                    headers: {
                        Authorization: `Basic ${btoa(`${user.username}:${user.password}`)}`,
                    },
                });
                setUserDetails(response.data);
            } catch (error) {
                console.error("Error fetching user profile", error);
                setError("Failed to fetch user profile.");
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchUserProfile();
        }
    }, [user]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/users/${userDetails.id}`, userDetails, {
                headers: {
                    Authorization: `Basic ${btoa(`${user.username}:${user.password}`)}`,
                },
            });
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile", error);
            setError("Failed to update profile.");
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!userDetails) {
        return <div>No user details available.</div>;
    }

    return (
        <div className="profile">
            <div className="profile-container">
                <h2>Your Profile</h2>
                <form onSubmit={handleUpdateProfile} className="profile-form">
                    {user.role === "PATIENT" ? (
                        <>
                            <h3>Patient Details</h3>
                            <input
                                type="text"
                                value={userDetails.username}
                                onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                                required
                                className="profile-input"
                            />
                            <input
                                type="email"
                                value={userDetails.email}
                                onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                                required
                                className="profile-input"
                            />
                            <input
                                type="text"
                                value={userDetails.medicalHistory || ""}
                                onChange={(e) => setUserDetails({ ...userDetails, medicalHistory: e.target.value })}
                                placeholder="Medical History"
                                className="profile-input"
                            />
                        </>
                    ) : user.role === "DOCTOR" ? (
                        <>
                            <h3>Doctor Details</h3>
                            <input
                                type="text"
                                value={userDetails.username}
                                onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                                required
                                className="profile-input"
                            />
                            <input
                                type="email"
                                value={userDetails.email}
                                onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                                required
                                className="profile-input"
                            />
                            <input
                                type="text"
                                value={userDetails.specialization || ""}
                                onChange={(e) => setUserDetails({ ...userDetails, specialization: e.target.value })}
                                placeholder="Specialization"
                                className="profile-input"
                            />
                        </>
                    ) : (
                        <div>Unknown user role.</div>
                    )}
                    <button type="submit" className="update-button">Update Profile</button>
                </form>
            </div></div>
    );
};

export default Profile;
