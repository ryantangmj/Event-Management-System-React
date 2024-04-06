import "./App.css";
import Home from "./container/home/homeMain";
import Box from "@mui/material/Box";
import { Routes, Route } from "react-router-dom";
import HostedEvents from "./container/hostedEvents/hostedEventsMain";
import RegisteredEvents from "./container/attendedEvents/attendedEventsMain";
import Profile from "./container/profile/profile";
import { CssBaseline } from "@mui/material";
import AddEvent from "./container/addEvent/addEvent";
import Landing from "./container/landing/landing";
import Login from "./container/login/login";
import Register from "./container/register/register";
import EventDetail from "./container/eventDetail/EventDetail";
import Attendance from "./container/attendance/Attendance";
import ProtectedRoute from "./helpers/ProtectedRoutes";

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
        </Routes>
      </Box>
    </>
  );
}

export default App;
