import { RoutinesContext } from "../context/RoutineContext";
import { useContext } from "react";

export const useRoutinesContext = () => {
  const context = useContext(RoutinesContext);

  if (!context) {
    throw new Error("useRoutineContext must be used within anRoutineContextProvider");
  }

  return context;

}