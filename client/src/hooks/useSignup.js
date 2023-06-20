import {useState} from 'react';
import { useAuthContext } from './useAuthContext';


export const useSignup = () => {
  const [error , setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (firstName, lastName, email, password) => {
    setIsLoading(true);
    setError(null);
    
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, password })
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setIsLoading(false);
    }
    if (response.ok) {
      //Save the user in local storage
      localStorage.setItem('user', JSON.stringify(json));

      //Update the AuthContext
      dispatch({ type: 'LOGIN', payload: json });

      setIsLoading(false);
    }
  };

  return { error, isLoading, signup };

};




