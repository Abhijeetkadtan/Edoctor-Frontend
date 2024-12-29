import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DoctorManagement.css";

const DoctorManagement = () => {
    const [doctors, setDoctors] = useState([]);
    const [newDoctor, setNewDoctor] = useState({ name: "", specialization: "", email: "" });
    const [editingDoctor, setEditingDoctor] = useState(null);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/doctors/all");
            setDoctors(response.data);
        } catch (error) {
            console.error("Error fetching doctors", error);
        }
    };

    const handleAddDoctor = async (e) => {
        e.preventDefault();
        try {
            const authHeader = {
                headers: {
                    Authorization: `Basic ${btoa("aaa:123456")}`, // Replace with actual admin credentials
                },
            };

            if (editingDoctor) {
                await axios.put(
                    `http://localhost:8080/api/doctors/update/${editingDoctor.id}`,
                    editingDoctor,
                    authHeader
                );
                setDoctors((prev) =>
                    prev.map((doc) => (doc.id === editingDoctor.id ? editingDoctor : doc))
                );
                setEditingDoctor(null);
            } else {
                const response = await axios.post(
                    "http://localhost:8080/api/doctors/add",
                    newDoctor,
                    authHeader
                );
                setDoctors((prev) => [...prev, response.data]);
                setNewDoctor({ name: "", specialization: "", email: "" });
            }
        } catch (error) {
            console.error("Error saving doctor", error);
        }
    };

    const handleDeleteDoctor = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/doctors/delete/${id}`);
            setDoctors((prev) => prev.filter((doctor) => doctor.id !== id));
        } catch (error) {
            console.error("Error deleting doctor", error);
        }
    };

    const handleEditDoctor = (doctor) => {
        setEditingDoctor({ ...doctor });
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        if (editingDoctor) {
            setEditingDoctor((prev) => ({ ...prev, [name]: value }));
        } else {
            setNewDoctor((prev) => ({ ...prev, [name]: value }));
        }
    };

    return (
        <div className="doctor-management">
            <h2>Doctor Management</h2>
            <form className="doctor-form" onSubmit={handleAddDoctor}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter name"
                        value={editingDoctor ? editingDoctor.name : newDoctor.name}
                        onChange={handleFormChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="specialization">Specialization</label>
                    <input
                        type="text"
                        id="specialization"
                        name="specialization"
                        placeholder="Enter specialization"
                        value={editingDoctor ? editingDoctor.specialization : newDoctor.specialization}
                        onChange={handleFormChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        value={editingDoctor ? editingDoctor.email : newDoctor.email}
                        onChange={handleFormChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">
                    {editingDoctor ? "Update Doctor" : "Add Doctor"}
                </button>
            </form>

            <table className="doctor-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Specialization</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doctor) => (
                        <tr key={doctor.id}>
                            <td>{doctor.id}</td>
                            <td>{doctor.name}</td>
                            <td>{doctor.specialization}</td>
                            <td>{doctor.email}</td>
                            <td>
                                <button className="edit-btn" onClick={() => handleEditDoctor(doctor)}>
                                    Edit
                                </button>
                                <button className="delete-btn" onClick={() => handleDeleteDoctor(doctor.id)}>
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

export default DoctorManagement;
