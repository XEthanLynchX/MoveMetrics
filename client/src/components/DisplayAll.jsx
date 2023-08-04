import { useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRoutinesContext } from "../hooks/useRoutinesContext";
import MoveMetrics from '../imgs/MoveMetrics.png';


const DisplayAll = () => {
  // const [routine, setRoutine] = useState([]);
  const { logout } = useLogout();
  const { user } = useAuthContext();
  
  // these have to make these to different variables 
  //  we set the state and then use that state to set the routines
  const { state, dispatch } = useRoutinesContext();
  const { routines } = state;
  
 
  // console.log("User:", user);

  const handleLogout = () => {
    logout();
  };
  
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/api/routines")
  //     .then((res) => {
  //       console.log(res.data);
  //       setRoutine(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  // console.log("Routines intial state:", routines); // Move the console.log here

  //my
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/routines")
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "GET_ROUTINES", payload: res.data });
       
      })
      .catch((err) => console.log(err));
  }, [dispatch]);
 
  console.log ("user", user);
 

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
  <div style={{ height: '100vh', backgroundColor: 'white', color: 'green' }}>
    <header style={{ backgroundColor: 'gray', color: 'white', padding: '5px', textAlign: 'center' }}>
      <h1 className="Move" style={{textAlign: "left"}}>MoveMetrics</h1>
      {!user && (
            <div>
              <Link to="/new" className="btn btn-primary me-3">Create New Routine</Link>
              <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
              )}
        {/* if user is not logged in, show the following */}
          {!user && (
            <div>
              <Link to="/login" className="btn btn-primary me-3">Login</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
              </div>
              )}

    </header>
    <div style={{ padding: '20px' }}>
      <div className="row">
        {routines && routines.map((routine) => (
          <div className="col-md-6 mb-4" key={routine._id}>
            <div className="DisplayAllCard" style={{ border: '1px solid gray', padding: '10px' }}>
              <div className="card-body">
                <Link to={`/routines/${routine._id}`} style={{ textDecoration: 'none' }}>
                  <h5 className="card-title" style={{ color: 'blue', marginBottom: '5px' }}>{routine.name}</h5>
                </Link>
                <p className="card-text"><span className="label">Minutes:</span> {routine.time}</p>
                <p className="card-text"><span className="label">Difficulty:</span> {routine.difficulty}/5</p>
                <p className="card-text"><span className="label">Description:</span> {routine.description}</p>
                {/* <button className="btn btn-danger" onClick={() => deleteRoutine(routine._id)}>Delete</button> */}
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


