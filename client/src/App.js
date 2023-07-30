import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import DisplayAll from './components/DisplayAll';
// import OneRoutine from './components/OneRoutine';
// import UpdateRoutine from './components/UpdateRoutine';
// import RoutineForm from './components/RoutineForm';
// import Login from './components/Login';
// import Signup from './components/Signup';
import { Home, Exercises, CreateRoutine, CreateExercise, Update, Login, Signup} from './pages';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import custom CSS file for styling

function App() {
  return (
    <div className="App bg-dark text-white min-vh-100">
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/create" element={<CreateRoutine />} />
          <Route path="/create-exercise" element={<CreateExercise />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
