import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from './config/authConfig';

const App: React.FC = () => {
  const { instance, accounts } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest).catch(e => {
      console.error(e);
    });
  };

  const handleLogout = () => {
    instance.logoutRedirect().catch(e => {
      console.error(e);
    });
  };

  return (
    <Router>
      <nav className="bg-blue-500 p-4 flex justify-between">
        <div>
          <Link to="/" className="text-white mr-4">Home</Link>
          <Link to="/profile" className="text-white">Profile</Link>
        </div>
        <div>
          {accounts.length > 0 ? (
            <button onClick={handleLogout} className="text-white">Logout</button>
          ) : (
            <button onClick={handleLogin} className="text-white">Login</button>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
