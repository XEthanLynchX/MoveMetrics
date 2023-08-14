import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useRoutinesContext } from '../hooks/useRoutinesContext';
import { useEffect } from 'react';


const UpdateRoutineForm = ({routine, onSubmission}) => {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [difficulty, setDifficulty] = useState('')
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const { dispatch } = useRoutinesContext();
  const [routineid, setRoutineid] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(false);
        


  const capitalizeFirstLetters = (input) => {
    return input
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  useEffect(() => {
    // Fetch the routine data using routineId and populate the form
    if (routine) {
      axios
        .get(`http://localhost:8000/api/routines/${routine.id}`)
        .then((res) => {
          console.log(res.data);
          console.log(routine);
          setRoutineid(routine._id);
          setName(routine.name);
          setTime(routine.time);
          setDifficulty(routine.difficulty);
          setDescription(routine.description);
        })
        .catch((err) => console.log(err));
    }
  },[routine]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    console.log('submitting form...');
  
    const capitalizedDescription = capitalizeFirstLetters(description);
  
    axios
      .put(`http://localhost:8000/api/routines/${routineid}`, {
        name: capitalizeFirstLetters(name),
        time,
        difficulty,
        description: capitalizedDescription,
      })
      .then((res) => {
        console.log(res);
        dispatch({ type: "UPDATE_ROUTINE", payload: res.data }); // Dispatch the action
        setSubmissionStatus(true);
        onSubmission();
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
      });
    };

  return (
    <div className="col-12">
      <div className="card bg-secondary text-white">
        <div className="card-body">
          <h5 className="card-title add">Update Routine!</h5>
              <form>
                <div className="form-group">
                  <label htmlFor="name" className="label">Routine Name:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    id="name"
                    placeholder='Name'
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                  />
                  {errors.name && <p className="error-message">{errors.name.message}</p>}
           
        
            <label htmlFor="time" className="label">Time:</label>
            <input
              className="form-control"
              type="number"
              name="time"
              id="time"
              placeholder='Minutes'
              value={time}
              onChange={(e) => { setTime(e.target.value) }}
            />

            {errors.time && <p className="error-message">{errors.time.message}</p>}

            <label htmlFor="difficulty" className="label">
              Difficulty:
            </label>
            <select
              className="form-control"
              name="difficulty"
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="">-- Select Difficulty --</option>
              <option value="1">Beginner</option>
              <option value="2">Intermediate</option>
              <option value="3">Expert</option>
            
            </select>
      {errors.difficulty && (
        <p className="error-message">{errors.difficulty.message}</p>
      )}
            

            <label htmlFor="description" className="label">Description:</label>
            <input
              className="form-control"
              type="text-area"
              name="description"
              id="description"
              placeholder='Description'
              value={description}
              onChange={(e) => { setDescription(e.target.value) }}
            />
            {errors.description && <p className="error-message">{errors.description.message}</p>}
          </div>
          <button type="submit" className="btn btn-primary" onClick={onSubmitHandler}>Submit</button>
        </form>
        </div>
      </div>
    </div>
  );
};
export default UpdateRoutineForm;