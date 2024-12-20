import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EntryManagement from './components/entry/EntryManagement';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Register from './components/register/Register';
import Login from './components/login/Login';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<EntryManagement />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
