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

function App() {
  return (
    <>
      <Box>
        <CssBaseline />
        <Routes>
          <Route path="" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/hostedEvents" element={<HostedEvents />} />
          <Route path="/attendedEvents" element={<RegisteredEvents />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/addEvent" element={<AddEvent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
