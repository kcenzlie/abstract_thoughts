import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth-context"; // Import useAuth
import Lighting from "../blocks/Backgrounds/Lightning/Lightning"; // Import Lighting component

function Home() {
    const { user } = useAuth(); // Get user from context

    return (
        <div className="home-container" style={{ position: "relative", overflow: "hidden", height: "100vh", width: "100vw" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 0 }}>
                <Lighting hue={230} intensity={1.5} speed={1.2} size={1.2} /> {/* Adjust Lighting to fill viewport */}
            </div>
            <div style={{ position: "relative", zIndex: 1 }}>
                {user ? ( // Check if user is logged in
                    <h1>Hello, you are logged in.</h1>
                ) : (
                    <div className="home-links">
                        <Link to="/register">Register</Link>
                        <Link to="/login">Login</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;