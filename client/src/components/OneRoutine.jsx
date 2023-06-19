import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const OneRoutine = (props) => {
  const { id } = useParams();
  const [oneRoutine, setOneRoutine] = useState({});

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
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="OneCard">
        <div className="card-body">
          <h5 className="card-title">
            <span className="label">Name:</span> {oneRoutine.name}
          </h5>
          <div className="card-text" style={{ maxWidth: '400px', overflowY: 'auto' }}>
            <span className="label">Exercise:</span>
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
    </div>
  );
};

export default OneRoutine;