import { Navigate } from "react-router-dom";

export default function TutorRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || user?.role !== "tutor") {
    return <Navigate to="/" replace />;
  }

  return children;
}
