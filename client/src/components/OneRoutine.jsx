import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import MoveMetricsLogo from "../imgs/MoveMetricsLogo.png";
import ExerciseForm from './ExerciseForm'; // Import the ExerciseForm component

const OneRoutine = () => {
  const { id } = useParams();
  const [oneRoutine, setOneRoutine] = useState({});
  const [exercises, setExercises] = useState([]); // New state for exercises
  const { state } = useAuthContext();
  const { user } = state;
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/routines/${id}`)
      .then((res) => {
        console.log(res.data);
        setOneRoutine(res.data);
      })
      .catch((err) => console.log(err));
  
    axios
      .get(`http://localhost:8000/api/routines/${id}/exercises`)
      .then((res) => {
        console.log(res.data);
        setExercises(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="display-all-container">
      <header className="bg-secondary bg-opacity-4 bg-gradient border-bottom border-dark border-4 text-white p-3 text-center shadow d-flex justify-content-between align-items-end">
        <div>
          <h1 className="Move" style={{ textShadow: "2px 2px black" }}>MoveMetrics</h1>
        </div>
  
        <div style={{marginRight: "10%"}}>
          {user ? (
            <div>
              <h1 style={{ textShadow: "2px 2px lightGreen", color: "black" }}>{oneRoutine.name}</h1>
              <Link to="/" className="btn btn-primary me-3">Home</Link>
              <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div>
              <Link to="/login" className="btn btn-primary me-3">Login</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </div>
          )}
        </div>
        
        <div>
          <img src={MoveMetricsLogo} alt="MoveMetricsLogo" />
        </div>
      </header>

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8">
            {/* Map through the exercises and display them */}
            {exercises.map((exercise) => (
              <div key={exercise._id} className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{exercise.name}</h5>
                  <p className="card-text">Sets: {exercise.sets}</p>
                  <p className="card-text">Reps: {exercise.reps}</p>
                  <p className="card-text">Load: {exercise.load}</p>
                  <p className="card-text">Instructions: {exercise.instructions}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <ExerciseForm routineId={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneRoutine;
