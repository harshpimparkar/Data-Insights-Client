import { useContext } from "react";
import { UserContext } from "./AuthContext";

export const useAuth = () => {
  return useContext(UserContext);
};
