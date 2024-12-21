// // src/pages/Home.js
// import React from "react";
// import { Link } from "react-router-dom";
// import './Home.css'; // Optional: Import CSS for styling

// const Home = () => {
//     return (
//         <div className="home-container">
//             <h1>Welcome to Outpatient Management System</h1>
//             <p>Please register or log in to continue.</p>
//             <Link to="/register">Register</Link>
//             <Link to="/login">Login</Link>
//         </div>
//     );
// };

// export default Home;
import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import "./Home.css"; // Import custom styles

const Home = () => {
    return (
        <div className="home-container">
            {/* Carousel Background */}
            <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                interval={3000}
                className="carousel-background"
            >
                <div>
                    <img
                        src="https://img.freepik.com/free-photo/health-still-life-with-copy-space_23-2148854031.jpg?t=st=1734505851~exp=1734509451~hmac=9c8160a227825260fecbfa9e700effafba16a07c72ddd6ad7553f9caf79df57f&w=1060"
                        alt="Hospital 1"
                    />
                </div>
                <div>
                    <img
                        src="https://img.freepik.com/free-vector/national-doctor-s-day-hand-drawn-background_23-2149438164.jpg?t=st=1734505897~exp=1734509497~hmac=5c0d2b97d6dc83df7c44e47effbf7f693ead6b1bbad7fe1f66c379302371e456&w=996"
                        alt="Clinic"
                    />
                </div>
                <div>
                    <img
                        src="https://img.freepik.com/free-vector/watercolor-medical-background_52683-161600.jpg?t=st=1734506420~exp=1734510020~hmac=f77e003d714760777d3f1b67569541b2614ea72edb218f3e6fbff1437a9e607f&w=996"
                        alt="Doctor"
                    />
                </div>
            </Carousel>

            {/* Foreground Content */}
            <div className="content-overlay">
                <h1>Welcome to Outpatient Management System</h1>
                <p>Please register or log in to continue.</p>
                <div className="home-buttons">
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
