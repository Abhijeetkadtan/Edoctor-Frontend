// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./AppointmentManagement.css";

// const AppointmentManagement = () => {
//     const [appointments, setAppointments] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         fetchAppointments();
//     }, []);

//     const fetchAppointments = async () => {
//         try {
//             const authHeader = {
//                 headers: {
//                     Authorization: `Basic ${btoa("aaa:123456")}`, // Replace with actual admin credentials
//                 },
//             };

//             const response = await axios.get("http://localhost:8080/api/admins/appointments/all", authHeader);
//             setAppointments(response.data);
//         } catch (error) {
//             console.error("Error fetching appointments", error);
//             if (error.response?.status === 403) {
//                 console.error("You do not have access to this resource.");
//             }
//         }
//     };


//     const handleDeleteAppointment = async (id) => {
//         try {
//             const authHeader = {
//                 headers: {
//                     Authorization: `Basic ${btoa("aaa:123456")}`, // Replace with actual admin credentials
//                 },
//             };

//             await axios.delete(`http://localhost:8080/api/admins/appointments/delete/${id}`, authHeader);
//             setAppointments((prevAppointments) => prevAppointments.filter((app) => app.id !== id));
//             alert("Appointment deleted successfully.");
//         } catch (error) {
//             setError("Failed to delete appointment.");
//             console.error("Error deleting appointment", error);
//         }
//     };

//     return (
//         <div className="appointment-management">
//             <h2>Appointment Management</h2>
//             {loading && <p>Loading appointments...</p>}
//             {error && <p className="error-message">{error}</p>}

//             {!loading && !error && (
//                 <>
//                     {appointments.length > 0 ? (
//                         <table className="appointment-table">
//                             <thead>
//                                 <tr>
//                                     <th>Patient</th>
//                                     <th>Doctor</th>
//                                     <th>Time</th>
//                                     <th>Status</th>
//                                     <th>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {appointments.map((app) => (
//                                     <tr key={app.id}>
//                                         <td>{app.user.username}</td>
//                                         <td>{app.doctor.name}</td>
//                                         <td>{new Date(app.appointmentTime).toLocaleString()}</td>
//                                         <td>{app.status}</td>
//                                         <td>
//                                             <button
//                                                 className="delete-btn"
//                                                 onClick={() => handleDeleteAppointment(app.id)}
//                                             >
//                                                 Delete
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     ) : (
//                         <p>No appointments available.</p>
//                     )}
//                 </>
//             )}
//         </div>
//     );
// };

// export default AppointmentManagement;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./AppointmentManagement.css";

// const AppointmentManagement = () => {
//     const [appointments, setAppointments] = useState([]);
//     const [newAppointment, setNewAppointment] = useState({
//         patient: "",
//         doctor: "",
//         time: "",
//         status: "",
//     });
//     const [editingAppointment, setEditingAppointment] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         fetchAppointments();
//     }, []);

//     const fetchAppointments = async () => {
//         try {
//             setLoading(true);
//             const authHeader = {
//                 headers: {
//                     Authorization: `Basic ${btoa("aaa:123456")}`, // Replace with actual admin credentials
//                 },
//             };

//             const response = await axios.get("http://localhost:8080/api/admins/appointments/all", authHeader);
//             setAppointments(response.data);
//         } catch (error) {
//             console.error("Error fetching appointments", error);
//             setError("Failed to fetch appointments.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleAddAppointment = async () => {
//         try {
//             const authHeader = {
//                 headers: {
//                     Authorization: `Basic ${btoa("aaa:123456")}`, // Replace with actual admin credentials
//                 },
//             };

//             const response = await axios.post(
//                 "http://localhost:8080/api/admins/appointments/add",
//                 newAppointment,
//                 authHeader
//             );
//             setAppointments([...appointments, response.data]);
//             setNewAppointment({ patient: "", doctor: "", time: "", status: "" });
//             alert("Appointment added successfully.");
//         } catch (error) {
//             console.error("Error adding appointment", error);
//             setError("Failed to add appointment.");
//         }
//     };

//     const handleEditAppointment = (appointment) => {
//         setEditingAppointment(appointment);
//         setNewAppointment({
//             patient: appointment.user.username,
//             doctor: appointment.doctor.name,
//             time: appointment.appointmentTime,
//             status: appointment.status,
//         });
//     };

//     const handleUpdateAppointment = async (id, updatedData) => {
//         try {
//             console.log("Payload being sent:", updatedData); // Debug payload
//             const authHeader = {
//                 headers: {
//                     Authorization: `Basic ${btoa("aaa:123456")}`, // Replace with admin credentials
//                 },
//             };

//             const response = await axios.put(
//                 `http://localhost:8080/api/admins/appointments/edit/${id}`,
//                 updatedData,
//                 authHeader
//             );
//             alert("Appointment updated successfully.");
//         } catch (error) {
//             console.error("Error updating appointment", error);
//             alert("Failed to update appointment.");
//         }
//     };


//     const handleDeleteAppointment = async (id) => {
//         try {
//             const authHeader = {
//                 headers: {
//                     Authorization: `Basic ${btoa("aaa:123456")}`, // Replace with actual admin credentials
//                 },
//             };

//             await axios.delete(`http://localhost:8080/api/admins/appointments/delete/${id}`, authHeader);
//             setAppointments((prevAppointments) => prevAppointments.filter((app) => app.id !== id));
//             alert("Appointment deleted successfully.");
//         } catch (error) {
//             console.error("Error deleting appointment", error);
//             setError("Failed to delete appointment.");
//         }
//     };

//     return (
//         <div className="appointment-management">
//             <h2>Appointment Management</h2>
//             {loading && <p>Loading appointments...</p>}
//             {error && <p className="error-message">{error}</p>}

//             <div className="appointment-form">
//                 <h3>{editingAppointment ? "Edit Appointment" : "Add Appointment"}</h3>
//                 <form
//                     onSubmit={(e) => {
//                         e.preventDefault();
//                         editingAppointment ? handleUpdateAppointment() : handleAddAppointment();
//                     }}
//                 >
//                     <input
//                         type="text"
//                         placeholder="Patient"
//                         value={newAppointment.patient}
//                         onChange={(e) => setNewAppointment({ ...newAppointment, patient: e.target.value })}
//                         required
//                     />
//                     <input
//                         type="text"
//                         placeholder="Doctor"
//                         value={newAppointment.doctor}
//                         onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
//                         required
//                     />
//                     <input
//                         type="datetime-local"
//                         placeholder="Time"
//                         value={newAppointment.time}
//                         onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
//                         required
//                     />
//                     <select
//                         value={newAppointment.status}
//                         onChange={(e) => setNewAppointment({ ...newAppointment, status: e.target.value })}
//                         required
//                     >
//                         <option value="">Select Status</option>
//                         <option value="PENDING">Pending</option>
//                         <option value="CONFIRMED">Confirmed</option>
//                         <option value="REJECTED">Rejected</option>
//                     </select>
//                     <button type="submit" className="submit-btn">
//                         {editingAppointment ? "Update Appointment" : "Add Appointment"}
//                     </button>
//                 </form>
//             </div>

//             {appointments.length > 0 ? (
//                 <table className="appointment-table">
//                     <thead>
//                         <tr>
//                             <th>Patient</th>
//                             <th>Doctor</th>
//                             <th>Time</th>
//                             <th>Status</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {appointments.map((app) => (
//                             <tr key={app.id}>
//                                 <td>{app.user.username}</td>
//                                 <td>{app.doctor.name}</td>
//                                 <td>{new Date(app.appointmentTime).toLocaleString()}</td>
//                                 <td>{app.status}</td>
//                                 <td>
//                                     <button className="edit-btn" onClick={() => handleEditAppointment(app)}>
//                                         Edit
//                                     </button>
//                                     <button className="delete-btn" onClick={() => handleDeleteAppointment(app.id)}>
//                                         Delete
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             ) : (
//                 <p>No appointments available.</p>
//             )}
//         </div>
//     );
// };

// export default AppointmentManagement;




import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AppointmentManagement.css";

const AppointmentManagement = () => {
    const [appointments, setAppointments] = useState([]);
    const [newAppointment, setNewAppointment] = useState({
        patient: "",
        doctor: "",
        time: "",
        status: "",
    });
    const [editingAppointment, setEditingAppointment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const authHeader = {
                headers: {
                    Authorization: `Basic ${btoa("aaa:123456")}`, // Replace with actual admin credentials
                },
            };

            const response = await axios.get("http://localhost:8080/api/admins/appointments/all", authHeader);
            setAppointments(response.data);
        } catch (error) {
            console.error("Error fetching appointments", error);
            setError("Failed to fetch appointments.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddAppointment = async () => {
        try {
            const authHeader = {
                headers: {
                    Authorization: `Basic ${btoa("aaa:123456")}`, // Replace with actual admin credentials
                },
            };

            const payload = {
                doctorName: newAppointment.doctor,
                username: newAppointment.patient,
                appointmentTime: newAppointment.time,
                consultationType: "General Consultation", // Default or dynamically selected
                reason: "Follow-up", // Default or dynamically entered
                paymentId: "PAY12345", // Placeholder or dynamically generated
                status: newAppointment.status || "PENDING", // Default if not set
                amount: 500, // Replace with actual value or default
            };

            console.log("Payload being sent:", payload); // Debug payload
            const response = await axios.post(
                "http://localhost:8080/api/admins/appointments/add",
                payload,
                authHeader
            );

            setAppointments([...appointments, response.data]);
            setNewAppointment({ patient: "", doctor: "", time: "", status: "" });
            alert("Appointment added successfully.");
        } catch (error) {
            console.error("Error adding appointment", error);
            alert("Failed to add appointment.");
        }
    };




    const handleEditAppointment = (appointment) => {
        setEditingAppointment(appointment);
        setNewAppointment({
            patient: appointment.user.username,
            doctor: appointment.doctor.name,
            time: appointment.appointmentTime,
            status: appointment.status,
        });
    };

    const handleUpdateAppointment = async () => {
        try {
            if (!editingAppointment) {
                alert("No appointment selected for update.");
                return;
            }

            const authHeader = {
                headers: {
                    Authorization: `Basic ${btoa("aaa:123456")}`, // Replace with admin credentials
                },
            };

            const updatedData = {
                appointmentTime: newAppointment.time,
                status: newAppointment.status,
                reason: editingAppointment.reason, // If reason is part of the appointment
            };

            const response = await axios.put(
                `http://localhost:8080/api/admins/appointments/edit/${editingAppointment.id}`,
                updatedData,
                authHeader
            );

            setAppointments((prev) =>
                prev.map((app) => (app.id === editingAppointment.id ? response.data : app))
            );
            setEditingAppointment(null);
            setNewAppointment({ patient: "", doctor: "", time: "", status: "" });
            alert("Appointment updated successfully.");
        } catch (error) {
            console.error("Error updating appointment", error);
            alert("Failed to update appointment.");
        }
    };

    const handleDeleteAppointment = async (id) => {
        try {
            const authHeader = {
                headers: {
                    Authorization: `Basic ${btoa("aaa:123456")}`, // Replace with actual admin credentials
                },
            };

            await axios.delete(`http://localhost:8080/api/admins/appointments/delete/${id}`, authHeader);
            setAppointments((prevAppointments) => prevAppointments.filter((app) => app.id !== id));
            alert("Appointment deleted successfully.");
        } catch (error) {
            console.error("Error deleting appointment", error);
            setError("Failed to delete appointment.");
        }
    };

    return (
        <div className="appointment-management">
            <h2>Appointment Management</h2>
            {loading && <p>Loading appointments...</p>}
            {error && <p className="error-message">{error}</p>}

            <div className="appointment-form">
                <h3>{editingAppointment ? "Edit Appointment" : "Add Appointment"}</h3>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        editingAppointment ? handleUpdateAppointment() : handleAddAppointment();
                    }}
                >
                    <input
                        type="text"
                        placeholder="Patient"
                        value={newAppointment.patient}
                        onChange={(e) => setNewAppointment({ ...newAppointment, patient: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Doctor"
                        value={newAppointment.doctor}
                        onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
                        required
                    />
                    <input
                        type="datetime-local"
                        placeholder="Time"
                        value={newAppointment.time}
                        onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                        required
                    />
                    <select
                        value={newAppointment.status}
                        onChange={(e) => setNewAppointment({ ...newAppointment, status: e.target.value })}
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="PENDING">Pending</option>
                        <option value="CONFIRMED">Confirmed</option>
                        <option value="REJECTED">Rejected</option>
                    </select>
                    <button type="submit" className="submit-btn">
                        {editingAppointment ? "Update Appointment" : "Add Appointment"}
                    </button>
                </form>
            </div>

            {appointments.length > 0 ? (
                <table className="appointment-table">
                    <thead>
                        <tr>
                            <th>Patient</th>
                            <th>Doctor</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((app) => (
                            <tr key={app.id}>
                                <td>{app.user.username}</td>
                                <td>{app.doctor.name}</td>
                                <td>{new Date(app.appointmentTime).toLocaleString()}</td>
                                <td>{app.status}</td>
                                <td>
                                    <button className="edit-btn" onClick={() => handleEditAppointment(app)}>
                                        Edit
                                    </button>
                                    <button className="delete-btn" onClick={() => handleDeleteAppointment(app.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No appointments available.</p>
            )}
        </div>
    );
};

export default AppointmentManagement;
