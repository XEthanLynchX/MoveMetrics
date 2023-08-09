import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import MoveMetricsLogo from "../imgs/MoveMetricsLogo.png";

const OneRoutine = () => {
  const { id } = useParams();
  const [oneRoutine, setOneRoutine] = useState({});
  const {state} = useAuthContext();
  const { user } = state
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
              <Link to="/new" className="btn btn-primary me-3">Create New Routine</Link>
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
    </div>
  );
};

export default OneRoutine;


{/* <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
<div className="OneCard">
  <div className="card-body">
    <h5 className="card-title">
      <span className="label">Name:</span> {oneRoutine.name}
    </h5>
    <div className="card-text" style={{ maxWidth: '400px', overflowY: 'auto' }}>
      <span className="label">Exercises:</span>
      {oneRoutine.exercise &&
        oneRoutine.exercise.map((exercise, index) => (
          <p key={index} className="mb-0">
            {exercise}
          </p>
        ))}
    </div>
    <p className="card-text">
      <span className="label">Time:</span> {oneRoutine.time}
    </p>
    <p className="card-text">
      <span className="label">Difficulty:</span> {oneRoutine.difficulty}/5
    </p>
    <p className="card-text" style={{ maxWidth: '400px', overflowY: 'auto' }}>
      <span className="label">Description:</span> {oneRoutine.description}
    </p>
    <div className="d-flex justify-content-center">
      <Link to={`/update/${id}`} className="btn btn-primary me-3">
        Edit Routine Details
      </Link>
      <Link to="/" className="btn btn-primary">
        Home
      </Link>
    </div>
  </div>
</div>
</div> */}