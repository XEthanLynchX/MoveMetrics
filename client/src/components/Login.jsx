import { useState} from 'react';
import { useLogin } from '../hooks/useLogin';
import { Link, useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useAuthContext } from "../hooks/useAuthContext";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login, error, isLoading} = useLogin();
  const {state} = useAuthContext();
  const { user } = state


console.log("User:", user);
const handleSubmit = async(e) => {
  e.preventDefault();
  await login(email, password);

};

return (
  <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="card" style={{ width: '400px', marginTop: '50px' }}>
      <div className="card-body">
        <h1 className="card-title text-center mb-4">Login</h1>

        <form onSubmit={handleSubmit}>
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

          <button type="submit" className="btn btn-primary" disabled={isLoading}>Login</button>
          <span></span>
        </form>

        {error && <p className="error-message2">{error.json.message}</p>}
        
        <p className="mt-3 text-center">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  </div>
);
};

export default Login;
