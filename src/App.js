import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Header from './components/Layout/Header';
import { NotificationManager } from './components/NotificationManager';

const App = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        {userInfo && <Route path="/dashboard" element={<Dashboard/>} />}
      </Routes>
      <NotificationManager/>
    </Router>
  );
};

export default App;
