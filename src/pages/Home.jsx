import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth-context"; // Import useAuth

function Home() {
    const { user } = useAuth(); // Get user from context

    return (
        <div className="bg-purple-100 text-gray-800 rounded-lg p-4">
            <header className="text-pink-500 p-2 text-center font-bold text-xl">
            Hello, one of the soul-bearing beings on Earth. 
            </header>
            <header className="text-white p-20 text-center text-sm font-thin">
            Welcome to the abstract depths of your inner self. 
            </header>
            <main className="p-2 max-w-3xl mx-auto text-center">
                {user ? (
                    <h2 className="text-lg font-thin">You are logged in.</h2>
                ) : (
                    <section className="mb-7">
                        <Link to="/register" className="text-blue-500 hover:underline mr-4">Register</Link>
                        <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                    </section>
                )}
            </main>
        </div>
    );
}

export default Home;