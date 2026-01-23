import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PoseList from "./pages/PoseList";
import SessionList from "./pages/SessionList";
import CreateSession from "./pages/CreateSession";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./admin/AdminDashboard";
import AddPose from "./admin/AddPose";
import ManagePoses from "./admin/ManagePoses";
import AdminRoute from "./components/AdminRoute";
import Profile from "./pages/Profile";
import ApplyTutor from "./pages/ApplyTutor";
import AdminTutorRequestDetail from "./admin/AdminTutorRequestDetail.jsx";
import AdminTutorRequests from "./admin/AdminTutorRequests";
import TutorDashboard from "./tutor/TutorDashboard";
import TutorRoute from "./components/TutorRoute";




function App() {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const showNavbar = !token || role === "user" ; 
  return (
    <>
     
      {showNavbar && <Navbar/>}
      {!showNavbar && role=="admin" && <AdminDashboard/>}
      {!showNavbar && role=="tutor" && <TutorDashboard/>}
      <div className="px-6 md:px-16 mt-6">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
  path="/"
  element={
    token && role === "admin"
      ? <Navigate to="/admin" replace />
      : <Home />
  }
/>

          <Route path="/poses" element={<PoseList />} />
          <Route path="/sessions" element={
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
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
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
<Route
  path="/tutor"
  element={
    <TutorRoute>
      <TutorDashboard />
    </TutorRoute>
  }
/>


        </Routes>
        
      </div>
    </>
  );
}

export default App;
