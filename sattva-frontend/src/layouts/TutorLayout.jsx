import TutorNavbar from "../components/TutorNavbar";
import { Outlet } from "react-router-dom";

export default function TutorLayout() {
  return (
    <div>
      <TutorNavbar />
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
}
