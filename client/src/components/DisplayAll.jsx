import { useEffect, useState, useNavigate} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const DisplayAll = () => {
  const [routine, setRoutine] = useState([]);

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
    axios.delete(`http://localhost:8000/api/routine/${deleteId}`)
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
    <div className="container" style={{ backgroundColor: 'red' }}>
       <header className="d-flex justify-content-evenly align-items-center py-2" style={{ backgroundColor: 'black', borderBottom: '3px solid gray' }}>
      <div>
        <h1 className="text-white">TrainExchange</h1>
      </div>
      <div>
        <Link to="/new" className="btn btn-primary me-3">Create New Routine</Link>
        <button className="btn  btn-primary">Logout</button>
      </div>
    </header>
  
    <div className="row mt-4">
      {routine.map((routine) => (
        <div className="col-md-4 mb-4" key={routine.id}>
          <div className="DisplayAllCard">
            <div className="card-body">
              <Link to={`/routines/${routine._id}`}>
                <h5 className="card-title">{routine.name}</h5>
              </Link>
              <p className="card-text"><span className="label">Minutes:</span> {routine.time}</p>
              <p className="card-text"><span className="label">Difficulty:</span> {routine.difficulty}/5</p>
              <p className="card-text"><span className="label">Description:</span> {routine.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
 
        };
export default DisplayAll;


