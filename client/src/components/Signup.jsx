import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signup, error, isLoading} = useSignup();

const handleSubmit = async(e) => {
  e.preventDefault();
  await signup(firstName, lastName, email, password)
  console.log(firstName, lastName, email, password)
};

return (
  <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="card" style={{ width: '400px', marginTop: '50px' }}>
      <div className="card-body">
        <h1 className="card-title text-center mb-4">Sign Up</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">First Name:</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Last Name:</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              className="form-control form-control-sm"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              className="form-control form-control-sm"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={isLoading}>Sign Up</button>
        
          {error && <p className="error">{error}</p>}
        </form>

        <p className="mt-3 text-center">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  </div>
);
};

export default Signup;
