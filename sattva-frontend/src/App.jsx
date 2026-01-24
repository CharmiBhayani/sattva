import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PoseList from "./pages/PoseList";
import SessionList from "./pages/SessionList";
import CreateSession from "./pages/CreateSession";
import Profile from "./pages/Profile";
import ApplyTutor from "./pages/ApplyTutor";
import LiveClasses from "./pages/LiveClasses";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import TutorRoute from "./components/TutorRoute";

import AdminDashboard from "./admin/AdminDashboard";
import AddPose from "./admin/AddPose";
import ManagePoses from "./admin/ManagePoses";
import AdminTutorRequests from "./admin/AdminTutorRequests";
import AdminTutorRequestDetail from "./admin/AdminTutorRequestDetail";

import TutorDashboard from "./tutor/TutorDashboard";
import CreateLiveClass from "./tutor/CreateLiveClass";
import MyLiveClasses from "./tutor/MyLiveClass";
import MyBookedClasses from "./pages/MyBookedClasses";
import EnrolledUsers from "./tutor/EnrolledUsers";

function App() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  // Navbar only for visitors + normal users
  const showNavbar = !token || role === "user";

  return (
    <>
      {showNavbar && <Navbar />}

      <div className="px-6 md:px-16 mt-6">
        <Routes>
          {/* AUTH */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* HOME */}
          <Route
            path="/"
            element={
              token && role === "admin" ? (
                <Navigate to="/admin" replace />
              ) : token && role === "tutor" ? (
                <Navigate to="/tutor" replace />
              ) : (
                <Home />
              )
            }
          />

          {/* PUBLIC */}
          <Route path="/poses" element={<PoseList />} />
          <Route path="/live-classes" element={<LiveClasses />} />

          {/* USER */}
          <Route
            path="/sessions"
            element={
              <ProtectedRoute>
                <SessionList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateSession />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/apply-tutor"
            element={
              <ProtectedRoute>
                <ApplyTutor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookedClasses />
              </ProtectedRoute>
            }
          />

          {/* ADMIN */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/add-pose"
            element={
              <AdminRoute>
                <AddPose />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/poses"
            element={
              <AdminRoute>
                <ManagePoses />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/tutor-requests"
            element={
              <AdminRoute>
                <AdminTutorRequests />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/tutor-requests/:id"
            element={
              <AdminRoute>
                <AdminTutorRequestDetail />
              </AdminRoute>
            }
          />

          {/* TUTOR */}
          <Route
            path="/tutor"
            element={
              <TutorRoute>
                <TutorDashboard />
              </TutorRoute>
            }
          />

          <Route
            path="/tutor/create-class"
            element={
              <TutorRoute>
                <CreateLiveClass />
              </TutorRoute>
            }
          />

          <Route
            path="/tutor/classes"
            element={
              <TutorRoute>
                <MyLiveClasses />
              </TutorRoute>
            }
          />

          <Route
            path="/tutor/enrollments"
            element={
              <TutorRoute>
                <EnrolledUsers />
              </TutorRoute>
            }
          />

        </Routes>
      </div>
    </>
  );
}

export default App;
