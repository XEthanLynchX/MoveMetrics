import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import MoveMetricsLogo from "../imgs/MoveMetricsLogo.png";
import ExerciseForm from './ExerciseForm'; // Import the ExerciseForm component
import formatDistanceTowNow from "date-fns/formatDistanceToNow";
import DeleteConfirmation from "./DeleteConfirmation2";
import trash from "../imgs/trash.png";
import settings from "../imgs/settings.png";
import UpdateExercise from "./UpdateExercise";

const OneRoutine = () => {
  const { id } = useParams();
  const [oneRoutine, setOneRoutine] = useState({});
  const [exercises, setExercises] = useState([]); // New state for exercises
  const { state } = useAuthContext();
  const { logout } = useLogout();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [exerciseToDelete, setexerciseToDelete] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false); 
  const [editExerciseId, setEditExercise] = useState(null);
  

  const handleLogout = () => {
    logout();
  };

  const handleDelete = (deleteId) => {
    setexerciseToDelete(deleteId);
    setShowConfirmation(true);
  };

  const handleEdit = (exercise) => {

    setEditExercise(exercise);
    setShowUpdateForm(true); // Show the UpdateRoutineForm
  };

  const handleCreateNew = () => {
    setShowUpdateForm(false); // Hide the update form
    setEditExercise(null); // Reset the exercise being edited
  };

  const handleUpdateSubmission = () => {
    // Reset the editRoutine and setShowUpdateForm after a successful submission
    setEditExercise(null);
    setShowUpdateForm(false);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/routines/${id}`, {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setOneRoutine(res.data);
      })
      .catch((err) => console.log(err));
  
    axios
      .get(`http://localhost:8000/api/routines/${id}/exercises`, {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setExercises(res.data);
      })
      .catch((err) => console.log(err));
  }, [id, state.user.token]);

  const updateExercises = () => {
    axios
      .get(`http://localhost:8000/api/routines/${id}/exercises`, {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setExercises(res.data);
      })
      .catch((err) => console.log(err));
  };

  const confirmDelete = () => {
    axios
      .delete(`http://localhost:8000/api/exercises/${exerciseToDelete}`, {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      })
      .then((res) => {
        console.log("Routine deleted:", res.data);
        updateExercises();
      })
      .catch((err) => {
        console.error("Error deleting exercise:", err.response);
      })
      .finally(() => {
        setShowConfirmation(false);
      });
  };

  return (
    <div className="the-container">
      <header className="bg-secondary bg-opacity-4 bg-gradient border-bottom border-dark border-4 text-white p-3 text-center shadow d-flex justify-content-between align-items-end">
        <div>
          <h1 className="Move" style={{ textShadow: "2px 2px black" }}>MoveMetrics</h1>
        </div>
  
        <div style={{marginRight: "10%"}}>
          {state.user ? (
            <div>
              <h1 style={{ textShadow: "2px 2px lightGreen", color: "black" }}>{oneRoutine.name}</h1>
              <Link to="/" className="btn btn-primary me-3">Home</Link>
              {showUpdateForm ? (
            <button className="btn btn-primary me-3" onClick={handleCreateNew}>
              Create New Exercise
            </button>
            ) : null}
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

      <div className="p-4 d-flex">
        <div className="routine-cards-container">
        {exercises && exercises.length > 0 ? (
            exercises.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((exercise) => (
              <div key={exercise._id} className="card mb-3">
                 <div className="DisplayAllCard border rounded p-3 position-relative">
                <div className="card-body">
                  <h5 className="card-title title">{exercise.name}</h5>
                  <p className="card-text label"><span className="label text-black">Sets: </span> {exercise.sets}</p>
                  <p className="card-text label"><span className="label text-black">Reps:</span> {exercise.reps}</p>
                  <p className="card-text label"><span className="label text-black">Load: </span>{exercise.load}</p>
                  <p className="card-text label"><span className="label text-black">Instructions: </span>{exercise.instructions}</p>

                  <p className="card-text label"><span className="label text-black">Created: </span>{formatDistanceTowNow(new Date(exercise.createdAt), { addsuffix: true })} ago</p>

                  <div className="button-container">
                      <button className="settings-button"  onClick={() => handleEdit(exercise)}  >
                        <img className="settings-icon" src={settings} alt="Settings" />
                      </button>

                      <button className="delete-button" onClick={() => handleDelete(exercise._id)}>
                    <img className="delete-icon" src={trash} alt="Delete" />
                  </button>
                  <DeleteConfirmation
                    show={showConfirmation}
                    onClose={() => setShowConfirmation(false)}
                    onConfirm={confirmDelete}
                  />
                    </div>
                  </div>
                  </div>
              </div>
            ))
            ) : (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">No routines available</h5>
                </div>
              </div>
            )}
          </div>
          <div className="sticky-form-container">
            <div className=" sticky-form">
            {showUpdateForm ? (
            <UpdateExercise exercise={editExerciseId}
            updateExercises={updateExercises}
            onSubmission={handleUpdateSubmission}
            />
            ) : (
            <ExerciseForm updateExercises={updateExercises} />
            )}
            </div>
          </div>
        </div>
      </div>
  
  );
};

export default OneRoutine;
