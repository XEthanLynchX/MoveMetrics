import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider, useAuthContext } from './context/AuthContext';

const Root = () => {
  const { user } = useAuthContext();

  useEffect(() => {
    console.log('user:', user);
  }, [user]);

  return (
    <React.StrictMode>
      <AuthContextProvider>
        {user !== null ? <App /> : <div>Loading...</div>}
      </AuthContextProvider>
    </React.StrictMode>
  );
};

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);

reportWebVitals();