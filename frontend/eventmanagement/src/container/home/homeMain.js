import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ItemCard from "./ItemCard.js";
import Navbar from "../../components/Navbar/navbar.jsx";
import Footer from "../../components/Footer/foooter.jsx";
import Api from "../../helpers/Api.js";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchEvents = async () => {
      try {
        const [allEvents, orgEvents] = await Promise.all([
          Api.getAllEvents(),
          Api.getOrgEvents(),
        ]);

        if (isMounted) {
          const now = new Date();

          const relevantEvents = allEvents.filter((event) => {
            const cleanedDateString = event.deadline.replace("[UTC]", "");
            const eventDate = new Date(cleanedDateString);

            return (
              !orgEvents.some((orgEvent) => orgEvent.id === event.id) &&
              eventDate > now
            );
          });

          setEvents(relevantEvents);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
      // const fetchEvents = async () => {
      //   Api.getAllEvents().then((response) => {
      //     setEvents(response);
      //   });
    };

    fetchEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Box>
      <Navbar />
      <Box
        id="hero"
        sx={() => ({
          width: "100%",
          bgcolor: "#FBF3D5",
          minHeight: "70vh",
          pb: "2rem",
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
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              p: 2,
            }}
          >
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "89%",
                padding: "10px",
                fontSize: "16px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                backgroundColor: "transparent",
              }}
            />
          </Box>
          <Grid
            container
            spacing={2}
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            {events
              .filter(
                (event) =>
                  event.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  event.date.includes(searchQuery) ||
                  event.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
              )
              .map((event) => (
                <Grid item key={event.id}>
                  <div
                    onClick={() => navigate(`/event/${event.id}`)}
                    style={{ textDecoration: "none", cursor: "pointer" }}
                  >
                    <ItemCard event={event} />
                  </div>
                </Grid>
              ))}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
