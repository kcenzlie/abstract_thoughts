import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth-context"; // Import useAuth

function Home() {
    const { user } = useAuth(); // Get user from context

    return (
        <div className="bg-white text-gray-800">
            <header className="text-gray-800 p-2 text-center text-lg">
            Hello, one of the soul-bearing beings on Earth. 
            </header>
            <header className="text-gray-800 p-2 text-center text-lg">
            Welcome to the abstract depths of your inner self. 
            </header>
            <main className="p-8 max-w-3xl mx-auto">
                {user ? (
                    <h2 className="text-lg font-medium">You are logged in.</h2>
                ) : (
                    <section className="mb-8">
                        <Link to="/register" className="text-blue-500 hover:underline mr-4">Register</Link>
                        <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                    </section>
                )}
            </main>
        </div>
    );
}

export default Home;