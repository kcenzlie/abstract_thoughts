import React, { useState } from 'react';
import supabase from '../helper/supabaseClient';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
// import '../css/Register.css';

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
      <div className="register-container">
        <h2>Register</h2>
        {message && <div className="message">{message}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Create Account</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    );
};

export default Register;