import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('users', (data) => {
      if (data.type === 'users') {
        setUsers(data.users);
      }
    });

    newSocket.on('disconnect', () => {
      setUsers((prev) => prev.map(u => ({ ...u, status: 'offline' })));
    });

    return () => newSocket.disconnect();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    if (socket) {
      socket.emit('login', { userId: userData._id });
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id }),
      });
      if (socket) {
        socket.emit('logout', { userId: user._id });
      }
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage onLogin={handleLogin} />} />
        <Route path="/" element={<DashboardPage user={user} users={users} onLogout={handleLogout} />} />
      </Routes>
    </Router>
  );
}

export default App;