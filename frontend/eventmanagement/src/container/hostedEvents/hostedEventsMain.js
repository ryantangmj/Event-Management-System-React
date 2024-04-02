import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ItemCard from "./itemCard.js";
import Footer from "../../components/Footer/foooter.jsx";
import Navbar from "../../components/Navbar/navbar.jsx";
import Api from "../../helpers/Api";

export default function RegisteredEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await Api.getOrgEvents();
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Failed to fetch organized events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Box>
      <Navbar />
      <Box
        id="hero"
        sx={() => ({
          width: "100%",
          bgcolor: "#FBF3D5",
          height: "100%",
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
          <h1>Hosted Events</h1>
          <Grid container spacing={1} justifyContent="center">
            {events.length === 0 ? (
              <h2>No events hosted yet</h2>
            ) : (
              <ItemCard events={events} />
            )}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
