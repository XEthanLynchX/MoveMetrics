import {createContext, useReducer} from 'react';

export const RoutinesContext = createContext();
//the children prop is the component that is wrapped by the context provider
//in this case, the children prop is the App component

export const routinesReducer = (state, action) => {
  switch(action.type) {
    case 'SET_ROUTINES':
      return {
        routines: action.payload
      }
    case 'CREATE_ROUTINE':
      return { 
        routines: [action.payload, ...state.routines ]
      }
    default:
      return state;
  }
}

export const RoutinesContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(routinesReducer, 
    {routines: null});

  return (
    <RoutinesContext.Provider value={{state, dispatch}}>
      { children }
    </RoutinesContext.Provider>
  )
}