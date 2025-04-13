import Write from './pages/Write'
import DataDisplay from './pages/DataDisplay'
import './css/App.css'
import {Routes, Route} from "react-router-dom";
import NavBar from './components/NavBar';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Wrapper from './pages/Wrapper';
import Comments from './components/Comments';
import { AuthProvider } from './context/auth-context';
import Message from './pages/Message';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <div>
      <ErrorBoundary>
        <NavBar />
      </ErrorBoundary>

      <main className="main-content">
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/write" element={<Write />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/login" element={<Login />}/>
            <Route 
              path="/dashboard" 
              element={
                <Wrapper>
                  <Dashboard />
                </Wrapper>
              }
            />
            <Route 
              path="/message" 
              element={
                <Wrapper>
                  <Message />
                </Wrapper>
              }
            />
          </Routes>
        </AuthProvider>
      </main>
    </div>
  )
}

export default App


// https://www.youtube.com/watch?v=_sSTzz13tVY 拯救我的tutorial
