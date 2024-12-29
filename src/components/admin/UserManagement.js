// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "../../context/AuthContext"; // Import AuthContext
// import "./UserManagement.css";

// const UserManagement = () => {
//     const { user } = useContext(AuthContext); // Access user from context
//     const [users, setUsers] = useState([]);
//     const [newUser, setNewUser] = useState({ username: "", email: "", password: "", role: "" });

//     // Fetch users from the backend
//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 console.log("Fetching users...");
//                 const response = await axios.get("http://localhost:8080/api/users/all", {
//                     headers: {
//                         "Authorization": `Bearer ${user.token}`, // Pass token in the headers
//                     },
//                 });
//                 console.log("Fetched users:", response.data); // Log the response to the console
//                 setUsers(response.data); // Update your state with the fetched users
//             } catch (error) {
//                 console.error("Error fetching users:", error);
//             }
//         };

//         if (user && user.token) {
//             fetchUsers();
//         }
//     }, [user]);  // Fetch users whenever the user context changes

//     // Handle adding a new user
//     const handleAddUser = async () => {
//         try {
//             console.log("Adding user:", newUser);
//             await axios.post("http://localhost:8080/api/users/add", newUser, {
//                 headers: {
//                     "Authorization": `Bearer ${user.token}`, // Add token in the header
//                 },
//             });

//             setNewUser({ username: "", email: "", password: "", role: "" }); // Reset the form

//             // Fetch the updated user list after adding
//             const response = await axios.get("http://localhost:8080/api/users/all", {
//                 headers: {
//                     "Authorization": `Bearer ${user.token}`, // Pass token in the headers
//                 },
//             });
//             setUsers(response.data);  // Update the users state
//         } catch (error) {
//             console.error("Error adding user:", error);
//         }
//     };

//     // Handle deleting a user
//     const handleDeleteUser = async (id) => {
//         try {
//             console.log("Deleting user with id:", id);
//             await axios.delete(`http://localhost:8080/api/users/delete/${id}`, {
//                 headers: {
//                     "Authorization": `Bearer ${user.token}`, // Pass token in the header
//                 },
//             });

//             // Remove deleted user from the state (optimistic UI update)
//             setUsers(users.filter((user) => user.id !== id));
//             console.log("User deleted. Updated user list:", users);
//         } catch (error) {
//             console.error("Error deleting user:", error);
//         }
//     };

//     return (
//         <div className="user-management">
//             <h2>User Management</h2>
//             <div className="add-user">
//                 <input
//                     type="text"
//                     placeholder="Username"
//                     value={newUser.username}
//                     onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
//                 />
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={newUser.email}
//                     onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={newUser.password}
//                     onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
//                 />
//                 <select
//                     value={newUser.role}
//                     onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
//                 >
//                     <option value="">Select Role</option>
//                     <option value="ADMIN">Admin</option>
//                     <option value="DOCTOR">Doctor</option>
//                     <option value="PATIENT">Patient</option>
//                 </select>
//                 <button onClick={handleAddUser}>Add User</button>
//             </div>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Username</th>
//                         <th>Email</th>
//                         <th>Role</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map((user) => (
//                         <tr key={user.id}>
//                             <td>{user.username}</td>
//                             <td>{user.email}</td>
//                             <td>{user.role}</td>
//                             <td>
//                                 <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default UserManagement;



import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserManagement.css";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: "", email: "", password: "", role: "" });
    const [editingUser, setEditingUser] = useState(null); // For editing user
    const [message, setMessage] = useState(""); // To display success messages

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const authHeader = {
                headers: {
                    Authorization: `Basic ${btoa("aaa:123456")}`, // Replace with actual admin credentials
                },
            };
            const response = await axios.get("http://localhost:8080/api/admins/users", authHeader);
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users", error);
        }
    };

    const handleAddUser = async () => {
        try {
            const authHeader = {
                headers: {
                    Authorization: `Basic ${btoa("aaa:123456")}`,
                },
            };
            const response = await axios.post("http://localhost:8080/api/admins/users/add", newUser, authHeader);
            setUsers((prevUsers) => [...prevUsers, response.data]); // Update table
            setNewUser({ username: "", email: "", password: "", role: "" });
            setMessage("User added successfully!");
            setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
        } catch (error) {
            console.error("Error adding user", error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            const authHeader = {
                headers: {
                    Authorization: `Basic ${btoa("aaa:123456")}`,
                },
            };
            await axios.delete(`http://localhost:8080/api/admins/users/delete/${id}`, authHeader);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id)); // Update table
            setMessage("User deleted successfully!");
            setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
        } catch (error) {
            console.error("Error deleting user", error);
        }
    };

    const handleEditUser = (user) => {
        setEditingUser(user); // Load user data into editing form
    };

    const handleUpdateUser = async () => {
        try {
            const authHeader = {
                headers: {
                    Authorization: `Basic ${btoa("aaa:123456")}`,
                },
            };
            await axios.put(
                `http://localhost:8080/api/admins/users/update/${editingUser.id}`,
                editingUser,
                authHeader
            );
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === editingUser.id ? { ...editingUser } : user
                )
            ); // Update table
            setEditingUser(null); // Clear editing state
            setMessage("User updated successfully!");
            setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
        } catch (error) {
            console.error("Error updating user", error);
        }
    };

    return (
        <div className="user-management-container">
            <h2>User Management</h2>
            {message && <div className="success-message">{message}</div>}

            <form
                className="add-user-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    editingUser ? handleUpdateUser() : handleAddUser();
                }}
            >
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Enter username"
                        value={editingUser ? editingUser.username : newUser.username}
                        onChange={(e) =>
                            editingUser
                                ? setEditingUser({ ...editingUser, username: e.target.value })
                                : setNewUser({ ...newUser, username: e.target.value })
                        }
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter email"
                        value={editingUser ? editingUser.email : newUser.email}
                        onChange={(e) =>
                            editingUser
                                ? setEditingUser({ ...editingUser, email: e.target.value })
                                : setNewUser({ ...newUser, email: e.target.value })
                        }
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <select
                        id="role"
                        value={editingUser ? editingUser.role : newUser.role}
                        onChange={(e) =>
                            editingUser
                                ? setEditingUser({ ...editingUser, role: e.target.value })
                                : setNewUser({ ...newUser, role: e.target.value })
                        }
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="ADMIN">Admin</option>
                        <option value="DOCTOR">Doctor</option>
                        <option value="PATIENT">Patient</option>
                    </select>
                </div>
                <button type="submit" className="submit-btn">
                    {editingUser ? "Update User" : "Add User"}
                </button>
            </form>

            <table className="user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button className="edit-btn" onClick={() => handleEditUser(user)}>
                                    Edit
                                </button>
                                <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;
