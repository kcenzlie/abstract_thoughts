import React, { useState } from 'react';
import supabase from '../helper/supabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const { signIn } = useAuth();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setMessage("");
  
      try {
        await signIn(email, password);
        navigate("/dashboard");
      } catch (error) {
        setMessage(error.message);
        setEmail("");
        setPassword("");
      }
    };
  
    return (
      <div className="login-container">
        <h2>Login</h2>
        {message && <div className="message error">{message}</div>}
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
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    );
  };
  
  export default Login;