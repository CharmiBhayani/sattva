
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ message: "Please log in first to access sessions." }}
      />
    );
  }

  return children;
}
