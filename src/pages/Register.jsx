import React, { useState } from 'react';
import supabase from '../helper/supabaseClient';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth-context';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const { signUp } = useAuth();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setMessage("");
  
      try {
        await signUp(email, password);
        setMessage("Account created successfully!");
        setEmail("");
        setPassword("");
      } catch (error) {
        setMessage(error.message);
      }
    };
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {message && <div className="text-red-500 mb-4">{message}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="border border-gray-300 rounded px-4 py-2 w-64"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="border border-gray-300 rounded px-4 py-2 w-64"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Create Account
          </button>
        </form>
        <p className="mt-4">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    );
};

export default Register;