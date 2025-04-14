import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth-context"; // Import useAuth
import Lighting from "../blocks/Backgrounds/Lightning/Lightning"; // Import Lighting component

function Home() {
    const { user } = useAuth(); // Get user from context

    return (
        <div className="relative overflow-hidden h-screen w-screen">
            <div className="absolute inset-0 z-0">
                <Lighting hue={230} intensity={1.5} speed={1.2} size={1.2} />
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full">
                {user ? (
                    <h1 className="text-2xl font-bold">Hello, you are logged in.</h1>
                ) : (
                    <div className="space-x-4">
                        <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
                        <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;