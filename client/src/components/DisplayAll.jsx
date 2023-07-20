import { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const DisplayAll = () => {
  const [routine, setRoutine] = useState([]);
  const { logout } = useLogout();
  const { user } = useAuthContext();
  
  console.log("User:", user);

  const handleLogout = () => {
    logout();
  };
  
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/routines")
      .then((res) => {
        console.log(res.data);
        setRoutine(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteRoutine = (deleteId) => {
    axios.delete(`http://localhost:8000/api/routines/${deleteId}`)
    .then((res) => {
      console.log(res); 
      const filerteredRoutine = routine.filter((routine) =>  routine._id !== deleteId); 
      setRoutine(filerteredRoutine);
    })

    .catch((err) => {
      console.log("error deleting store", err.response);
     });

 }

 return (
  <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: 'black', color: 'red' }}>
    <div className="container p-4" style={{ backgroundColor: 'red', border:'10px inset gray', borderRadius: '8px', overflowY: 'scroll', maxHeight: '80vh' }}>
      <header className="d-flex justify-content-between align-items-center mb-4" style={{ borderBottom: '10px solid black' }}>
        <h1 className="text-white">TrainExchange</h1>
        {/* if user is logged in, show the following */}
        
          {!user && (
            <div>
              <Link to="/new" className="btn btn-primary me-3">Create New Routine</Link>
              <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
              )}
        {/* if user is not logged in, show the following */}
          {user && (
            <div>
              <Link to="/login" className="btn btn-primary me-3">Login</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
              </div>
              )}
      </header>

      <div className="row">
        {routine.map((routine) => (
          <div className="col-md-6 mb-4" key={routine.id}>
            <div className="DisplayAllCard">
              <div className="card-body">
                <Link to={`/routines/${routine._id}`}>
                  <h5 className="card-title">{routine.name}</h5>
                </Link>
                <p className="card-text"><span className="label">Minutes:</span> {routine.time}</p>
                <p className="card-text"><span className="label">Difficulty:</span> {routine.difficulty}/5</p>
                <p className="card-text"><span className="label">Description:</span> {routine.description}</p>
                <button className="btn btn-danger" onClick={() => deleteRoutine(routine._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
 
};
        
export default DisplayAll;


