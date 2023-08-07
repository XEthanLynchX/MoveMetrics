import { useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRoutinesContext } from "../hooks/useRoutinesContext";
import trash from "../imgs/trash.png";


const DisplayAll = () => {
  
  const { logout } = useLogout();
  const user = JSON.parse(localStorage.getItem("user"));
  // these have to make these to different variables 
  //  we set the state and then use that state to set the routines
  const { state, dispatch } = useRoutinesContext();
  const { routines } = state;
  
 


  const handleLogout = () => {
    logout();
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
    if (window.confirm("Are you sure you want to delete this routine?")) {
      axios.delete(`http://localhost:8000/api/routines/${deleteId}`)
        .then((res) => {
          console.log("Routine deleted:", res.data);
          dispatch({ type: "DELETE_ROUTINE", payload: deleteId });
        })
        .catch((err) => {
          console.error("Error deleting routine:", err.response);
          // Show an error notification to the user
          // You might use a library like react-toastify or any other notification library
        });
    }
  };
  
  // const deleteRoutine = (deleteId) => {
  //   axios.delete(`http://localhost:8000/api/routines/${deleteId}`)
  //   .then((res) => {
  //     console.log(res); 
//   //     const filerteredRoutine = routine.filter((routine) =>  routine._id !== deleteId); 
//   //     setRoutine(filerteredRoutine);
//   //   })

//     .catch((err) => {
//       console.log("error deleting store", err.response);
//      });

//  }

return (
  <div className="display-all-container">
    <header className="bg-dark bg-gradient text-white p-3 text-center">
      <h1 className="Move" style={{ textAlign: 'left' }}>MoveMetrics</h1>
      {user ? (
        <div>
          <Link to="/new" className="btn btn-primary me-3">Create New Routine</Link>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <Link to="/login" className="btn btn-primary me-3">Login</Link>
          <Link to="/signup" className="btn btn-primary">Sign Up</Link>
        </div>
      )}
    </header>
    <div className="p-4">
      <div className="row">
        {routines && routines.map((routine) => (
          <div className="col-md-6 mb-4" key={routine._id}>
            <div className="DisplayAllCard border rounded p-3 position-relative">
              <div className="card-body">
                <Link to={`/routines/${routine._id}`} style={{ textDecoration: 'none' }}>
                  <h5 className="routine-title">{routine.name}</h5>
                </Link>
                <p className="card-text"><span className="label text-black">Minutes:</span> {routine.time}</p>
                <p className="card-text"><span className="label text-black">Difficulty:</span> {routine.difficulty}/5</p>
                <p className="card-text"><span className="label text-black">Description:</span> {routine.description}</p>
                <button className="delete-button" onClick={() => handleDelete(routine._id)}>
                  <img className="delete-icon" src={trash} alt="Delete" />
                </button>
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


