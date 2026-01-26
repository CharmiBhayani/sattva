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
import MyBookedClasses from "./pages/MyBookedClasses";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import TutorRoute from "./components/TutorRoute";

// ADMIN
import AdminDashboard from "./admin/AdminDashboard";
import AddPose from "./admin/AddPose";
import ManagePoses from "./admin/ManagePoses";
import AdminTutorRequests from "./admin/AdminTutorRequests";
import AdminTutorRequestDetail from "./admin/AdminTutorRequestDetail";
import AdminTutors from "./admin/AdminTutors";
// TUTOR
import TutorLayout from "./layouts/TutorLayout";
import TutorDashboard from "./tutor/TutorDashboard";
import CreateLiveClass from "./tutor/CreateLiveClass";
import MyLiveClasses from "./tutor/MyLiveClass";
import EnrolledUsers from "./tutor/EnrolledUsers";
import AdminOverview from "./admin/AdminOverview";

function App() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  // Navbar only for visitors + users
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

          {/* ================= ADMIN (NESTED) ================= */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          >
            {/* default admin page */}
            <Route index element={<AdminOverview />} />

            <Route path="poses" element={<ManagePoses />} />
            <Route path="add-pose" element={<AddPose />} />

            <Route path="tutor-requests" element={<AdminTutorRequests />} />
            <Route
              path="tutor-requests/:id"
              element={<AdminTutorRequestDetail />}
            />
            <Route path="tutors" element={<AdminTutors/>}/>
          </Route>

          {/* ================= TUTOR ================= */}
          
         <Route
            path="/tutor"
            element={
              <TutorRoute>
                <TutorLayout />
              </TutorRoute>
            }
          >
            <Route path="dashboard" element={<TutorDashboard />} />
            <Route path="create-class" element={<CreateLiveClass />} />
            <Route path="my-classes" element={<MyLiveClasses />} />
            <Route path="enrolled-users" element={<EnrolledUsers />} />
          </Route>


        </Routes>
      </div>
    </>
  );
}

export default App;
