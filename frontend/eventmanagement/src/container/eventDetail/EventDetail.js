import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useParams } from "react-router-dom";
import EventDetailsMain from "./EventDetailsMain.js";
import { CssBaseline } from "@mui/material";
import Footer from "../../components/Footer/foooter.jsx";
import Api from "../../helpers/Api.js";
import Navbar from "../../components/Navbar/navbar.jsx";

export default function EventDetail() {
  const [event, setEvent] = useState([]);
  const [organiser, setOrganiser] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const fetchedEvent = await Api.fetchEventById(id);
        setEvent(fetchedEvent);
        setOrganiser(fetchedEvent.organiser);
      } catch (error) {
        console.error("Failed to fetch event:", error);
      }
    };

    fetchEvent();
  }, []);

  return (
    <Box>
      <Navbar />
      <CssBaseline />
      <Box
        id="hero"
        sx={() => ({
          width: "100%",
          bgcolor: "#FBF3D5",
          minHeight: "70vh",
        })}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pt: "7rem",
          }}
        >
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <EventDetailsMain
              id={id}
              selectedEvent={event}
              organiser={organiser}
            />
          </Container>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
