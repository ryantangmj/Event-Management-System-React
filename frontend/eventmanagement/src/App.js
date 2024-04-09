import Home from "./container/Home/HomeMain";
import Box from "@mui/material/Box";
import { Routes, Route } from "react-router-dom";
import HostedEvents from "./container/HostedEvents/HostedEventsMain";
import RegisteredEvents from "./container/AttendedEvents/AttendedEventsMain";
import Profile from "./container/Profile/Profile";
import { CssBaseline } from "@mui/material";
import AddEvent from "./container/AddEvent/AddEvent";
import Landing from "./container/Landing/Landing";
import Login from "./container/Login/Login";
import Register from "./container/Register/Register";
import EventDetail from "./container/EventDetail/EventDetail";
import Attendance from "./container/Attendance/Attendance";
import ProtectedRoute from "./helpers/ProtectedRoutes";
import UserDetail from "./container/UserDetail/UserDetailMain";

function App() {
  return (
    <>
      <Box>
        <title> Event Genesis</title>
        <CssBaseline />
        <Routes>
          <Route path="" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hostedEvents"
            element={
              <ProtectedRoute>
                <HostedEvents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendedEvents"
            element={
              <ProtectedRoute>
                <RegisteredEvents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/event/:id"
            element={
              <ProtectedRoute>
                <EventDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendance/:id"
            element={
              <ProtectedRoute>
                <Attendance />
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
            path="/addEvent"
            element={
              <ProtectedRoute>
                <AddEvent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userDetail/:id"
            element={
              <ProtectedRoute>
                <UserDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Box>
    </>
  );
}

export default App;
