import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();


  //Since the user is in local storage, we can remove it from there
  //and then reload the page to update the AuthContext
  const logout = () => {
    localStorage.removeItem('user');
    

    dispatch({ type: "LOGOUT" });
  }

  return {logout}
}