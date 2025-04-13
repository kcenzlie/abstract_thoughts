import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth-context"; // Import useAuth

function Home() {
    const { user } = useAuth(); // Get user from context

    return (
        <div className="home-container">
            {user ? ( // Check if user is logged in
                <h1>Hello, you are logged in.</h1>
            ) : (
                <div className="home-links">
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                </div>
            )}
        </div>
    );
}

export default Home;