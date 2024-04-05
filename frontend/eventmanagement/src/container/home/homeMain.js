import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ItemCard from "./itemCard.js";
import Navbar from "../../components/Navbar/navbar.jsx";
import Footer from "../../components/Footer/foooter.jsx";
import Api from "../../helpers/Api";
import { Link } from "react-router-dom";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await Api.getAllEvents();
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
                  <Link
                    to={`/event/${event.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <ItemCard event={event} />
                  </Link>
                </Grid>
              ))}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
