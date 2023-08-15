import { useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useLogout } from "../hooks/useLogout";
import { useRoutinesContext } from "../hooks/useRoutinesContext";
import trash from "../imgs/trash.png";
import MoveMetricsLogo from "../imgs/MoveMetricsLogo.png";
import formatDistanceTowNow from "date-fns/formatDistanceToNow";
import DeleteConfirmation from "./DeleteConfirmation1";
import { useState } from "react";
import RoutineForm from "./RoutineForm";
import settings from "../imgs/settings.png";
import UpdateRoutineForm from "./UpdateRoutineForm";


const DisplayAll = () => {
  const { logout } = useLogout();
  const user = JSON.parse(localStorage.getItem("user"));
  // these have to make these to different variables 
  //  we set the state and then use that state to set the routines
  const { state, dispatch } = useRoutinesContext();
  const { routines } = state;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [routineToDelete, setRoutineToDelete] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false); 
  const [editRoutineId, setEditRoutine] = useState(null);
 
  const handleLogout = () => {
    logout();
  };

  const handleEdit = (routine) => {
    setEditRoutine(routine);
    setShowUpdateForm(true); // Show the UpdateRoutineForm
  };

  const handleCreateNew = () => {
    setShowUpdateForm(false); // Hide the update form
    setEditRoutine(null); // Reset the routine being edited
  };

  const handleUpdateSubmission = () => {
    // Reset the editRoutine and setShowUpdateForm after a successful submission
    setEditRoutine(null);
    setShowUpdateForm(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/routines")
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "GET_ROUTINES", payload: res.data });
       
      })
      .catch((err) => console.log(err));
  }, [dispatch]);
 
  // console.log ("user", user);
 
  const handleDelete = (deleteId) => {
    setRoutineToDelete(deleteId);
    setShowConfirmation(true);
  };

  const getDifficultyText = (difficulty) => {
    switch (difficulty) {
      case 1:
        return "Beginner";
      case 2:
        return "Intermediate";
      case 3:
        return "Expert";
      default:
        return "Unknown";
    }
  };


  const confirmDelete = () => {
    axios
      .delete(`http://localhost:8000/api/routines/${routineToDelete}`)
      .then((res) => {
        console.log("Routine deleted:", res.data);
        dispatch({ type: "DELETE_ROUTINE", payload: routineToDelete });
      })
      .catch((err) => {
        console.error("Error deleting routine:", err.response);
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

      <div style={{ marginRight: "10%" }}>
        {user ? (
          
          <div>
            
            <p className="email"> {user.email}</p>{showUpdateForm ? (
            <button className="btn btn-primary me-3" onClick={handleCreateNew}>
              Create New Routine
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
    {routines && routines.length > 0 ? (
      routines.map((routine) => (
        <div className="mb-4" key={routine._id}>
          <div className="DisplayAllCard border rounded p-3 position-relative">
            <div className="card-body">
              <Link to={`/${routine._id}`} style={{ textDecoration: 'none' }}>
                <h5 className="title">{routine.name}</h5>
              </Link>
              <p className="card-text"><span className="label text-black">Minutes:</span> {routine.time}</p>
             
              <p className="card-text">
                <span className="label text-black">Difficulty:</span>{" "}
                {getDifficultyText(routine.difficulty)}
              </p>
              <p className="card-text">
                <span className="label text-black">Description:</span>{" "}
                {routine.description}
              </p>
              <p className="card-text"><span className="label text-black">Created:</span> {formatDistanceTowNow(new Date(routine.createdAt), { addsuffix: true })} ago</p>

             
              <div className="button-container">
                  <button className="settings-button"  onClick={() => handleEdit(routine)}  >
                    <img className="settings-icon" src={settings} alt="Settings" />
                  </button>

                  <button className="delete-button" onClick={() => handleDelete(routine._id)}>
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
    <div className="sticky-form">
      {showUpdateForm ? (
        <UpdateRoutineForm routine={editRoutineId} onSubmission={handleUpdateSubmission}/>
      ) : (
        <RoutineForm />
      )}
    </div>
  </div>
</div>
</div>
);
};
       
export default DisplayAll;


