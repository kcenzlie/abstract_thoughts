import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Write from './pages/Write';
import Message from './pages/Message';
import Login from './pages/Login';
import './css/App.css';
import { AuthProvider } from './context/auth-context';
import Dashboard from './pages/Dashboard';
import Wrapper from './pages/Wrapper';
import Comments from './components/Comments';
import Register from './pages/Register';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <Router basename="/abstract_thoughts">
      <ErrorBoundary>
        <AuthProvider>
          <div className="App">
            <NavBar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/write" element={<Write />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/message" element={<Message />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <Wrapper>
                      <Dashboard />
                    </Wrapper>
                  }
                />
                <Route 
                  path="/comments" 
                  element={
                    <Wrapper>
                      <Comments />
                    </Wrapper>
                  }
                />
              </Routes>
            </main>
          </div>
        </AuthProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;


// https://www.youtube.com/watch?v=_sSTzz13tVY 拯救我的tutorial
