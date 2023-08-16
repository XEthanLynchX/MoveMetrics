import React from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import DisplayAll from './components/DisplayAll';
import OneRoutine from './components/OneRoutine';
import Login from './components/Login';
import Signup from './components/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import custom CSS file for styling
import { useAuthContext } from './hooks/useAuthContext';




function App() {
  const { state } = useAuthContext();
  console.log("App.js,", state.user);

  return (
    <div className="App bg-dark text-white min-vh-100">
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element ={ state.user ? <DisplayAll/> : <Navigate to="/login" />} />

          <Route path="/:id" element={state.user ? <OneRoutine /> : <Navigate to = "/login" /> } />
          <Route path="/login" element={ !state.user ? <Login/> : <Navigate to="/" />} />
          <Route path="/signup" element={!state.user ? <Signup /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
