import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useParams } from 'react-router-dom';

const ExerciseForm = () => {
  const [name, setName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [load, setLoad] = useState('');
  const [instructions, setInstructions] = useState('');
  const { routineId } = useParams();
  const [errors, setErrors] = useState({});

  const onSubmitHandler = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:8000/api/exercises', {
        routineId,
        name,
        sets,
        reps,
        load,
        instructions
      })
      .then((res) => {
        console.log(res);
        // Handle success action, if needed
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
          <h5 className="card-title add">Add a New Exercise!</h5>
          <form>
            <div className="form-group">
              <label htmlFor="name" className="label">Exercise Name:</label>
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

              <label htmlFor="sets" className="label">Sets:</label>
              <input
                className="form-control"
                type="number"
                name="sets"
                id="sets"
                placeholder='Sets'
                value={sets}
                onChange={(e) => { setSets(e.target.value) }}
              />

              {errors.sets && <p className="error-message">{errors.sets.message}</p>}

              <label htmlFor="reps" className="label">Reps:</label>
              <input
                className="form-control"
                type="number"
                name="reps"
                id="reps"
                placeholder='Reps'
                value={reps}
                onChange={(e) => { setReps(e.target.value) }}
              />

              {errors.reps && <p className="error-message">{errors.reps.message}</p>}

              <label htmlFor="load" className="label">Load:</label>
              <input
                className="form-control"
                type="number"
                name="load"
                id="load"
                placeholder='Load'
                value={load}
                onChange={(e) => { setLoad(e.target.value) }}
              />

              {errors.load && <p className="error-message">{errors.load.message}</p>}

              <label htmlFor="instructions" className="label">Instructions:</label>
              <input
                className="form-control"
                type="text"
                name="instructions"
                id="instructions"
                placeholder='Instructions'
                value={instructions}
                onChange={(e) => { setInstructions(e.target.value) }}
              />

              {errors.instructions && <p className="error-message">{errors.instructions.message}</p>}

              
            </div>
            <button type="submit" className="btn btn-primary" onClick={onSubmitHandler}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExerciseForm;
