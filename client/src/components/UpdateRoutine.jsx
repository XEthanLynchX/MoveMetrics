import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams , Link, useNavigate} from 'react-router-dom'

const UpdateRoutine = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [exercise, setExercise] = useState([]);
  const [time, setTime] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [exercisesError, setExerciseError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/routines/${id}`)
      .then(res => {
        console.log(res.data);
        setName(res.data.name);
        setExercise(res.data.exercise);
        setTime(res.data.time);
        setDifficulty(res.data.difficulty);
        setDescription(res.data.description);
      })
      .catch(err => console.log(err));
  }, [id]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    
    //custom validation for exercise
    const validateExercise = () => {
      if (exercise.length === 0) {
        setExerciseError('Exercise(s) is required.');
        return false; // Return false to indicate validation failure
      } else if (exercise.some((ex) => ex.length < 5)) {
        setExerciseError('Exercise(s) must be at least 5 characters long.');
        return false; // Return false to indicate validation failure
      } else if (exercise.some((ex) => ex.length > 500)) {
        setExerciseError('Exercise(s) cannot be more than 500 characters long.');
        return false; // Return false to indicate validation failure
      }
      setExerciseError('');
      return true; // Return true to indicate validation success
    };
    
    // Call validateExercise and store the result in a variable
    const isValid = validateExercise();
    
    // If isValid is true, then submit the form data to the backend
    if (isValid) {
      axios
        .put(`http://localhost:8000/api/routines/${id}`, {
          name,
          exercise,
          time,
          difficulty,
          description,
        })
        .then((res) => {
          console.log(res);
          navigate("/");
        })
        .catch((err) => {
          console.log(err.response.data.errors);
          setErrors(err.response.data.errors);
        });
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
    <div className="col-8">
      <div className="card bg-black text-white">
        <div className="card-header">
          <Link to="/" className="btn btn-primary me-3">Home</Link>
          {/* <button className="btn  btn-primary">Logout</button> */}
        </div>
        <div className="card-body">

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
           

            <label htmlFor="exercise" className="label">Exercise(s):</label>
            <input
              className="form-control"
              type="text"
              name="exercise"
              id="exercise"
              placeholder='Exercise(s)'
              value={exercise.join(', ')}
              onChange={(e) => setExercise(e.target.value.split(', '))}
            />
            {exercisesError && <p className='error-message'>{exercisesError}</p>}
            {errors.exercise && <p className="error-message">{errors.exercise.message}</p>}
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

            <label htmlFor="difficulty" className="label">Difficulty:</label>
            <input
              className="form-control"
              type="number"
              name="difficulty"
              id="difficulty"
              placeholder='Difficulty'
              value={difficulty}
              onChange={(e) => { setDifficulty(e.target.value) }}
            />

            {errors.difficulty && <p className="error-message">{errors.difficulty.message}</p>}

            <label htmlFor="description" className="label">Description:</label>
            <input
              className="form-control"
              type="text"
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
</div>

   )  } 
  
export default UpdateRoutine;