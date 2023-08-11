import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DisplayAll from './components/DisplayAll';
import OneRoutine from './components/OneRoutine';
import UpdateRoutine from './components/UpdateRoutine';
import Login from './components/Login';
import Signup from './components/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import custom CSS file for styling

function App() {
  return (
    <div className="App bg-dark text-white min-vh-100">
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DisplayAll />} />
          <Route path="/:id" element={<OneRoutine />} />
          <Route path="/update/:id" element={<UpdateRoutine />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
