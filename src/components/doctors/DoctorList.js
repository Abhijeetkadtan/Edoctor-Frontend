// src/components/doctors/DoctorList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Change to useNavigate
import './DoctorList.css'; // Create a CSS file for styling

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const navigate = useNavigate(); // Get the navigate function for navigation

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/doctors");
                setDoctors(response.data);
            } catch (error) {
                console.error("Error fetching doctors", error);
            }
        };

        fetchDoctors();
    }, []);

    const handleBookAppointment = (doctorId) => {
        // Redirect to the ScheduleAppointment page with the selected doctor's ID
        navigate(`/appointments/schedule/${doctorId}`); // Use navigate function instead of history.push
    };

    return (
        <div className="doctor-list">
            <h2>Available Doctors</h2>
            <div className="doctor-cards-container">
                {doctors.map((doctor) => (
                    <div className="doctor-card" key={doctor.id}>
                        <h3>{doctor.name}</h3>
                        <p>Specialty: {doctor.specialization}</p>
                        <p>Location: {doctor.location}</p>
                        <p>Rating:⭐⭐⭐⭐ {doctor.rating}</p>
                        <button onClick={() => handleBookAppointment(doctor.id)}>Book Appointment</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorList;