import { useAuthContext } from "./useAuthContext";
import { useRoutinesContext } from "./useRoutinesContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchRoutines } = useRoutinesContext();


  //Since the user is in local storage, we can remove it from there
  //and then reload the page to update the AuthContext
  const logout = () => {
    localStorage.removeItem('user');
    

    dispatch({ type: "LOGOUT" });
    //This is to reset the routines context after logout
    dispatchRoutines({ type: "GET_ROUTINES", payload: null  });
  }

  return {logout}
}