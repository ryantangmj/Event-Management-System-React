import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ItemCard from "./ItemCard.js";
import Navbar from "../../components/Navbar/navbar.jsx";
import Footer from "../../components/Footer/foooter.jsx";
import Api from "../../helpers/Api.js";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import UserHeader from "./UserHeader.js";
import { Link } from "react-router-dom";
import noPastEvents from "../../assets/noPastEvents.png";
import noUpcomingEvents from "../../assets/noUpcomingEvents.png";

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await Api.getOrgEventsByUserId(id);
        console.log(fetchedEvents);
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Failed to fetch organized events:", error);
      }
    };

    fetchEvents();
  }, []);

  const activeEvents = events.filter(
    (event) => new Date(event.date.replace("[UTC]", "")) >= new Date()
  );

  const inactiveEvents = events.filter(
    (event) => new Date(event.date.replace("[UTC]", "")) < new Date()
  );

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
          <UserHeader id={id} />
          <Grid
            container
            spacing={2}
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <Grid container sx={{ ml: 3, mt: 3 }} spacing={1}>
              <div
                style={{
                  marginRight: "auto",
                  marginBottom: "1rem",
                  overflow: "auto",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "30px",
                    fontWeight: "800",
                    m: "0 auto 1rem .5rem",
                    fontFamily: "nunito, sans-serif",
                  }}
                >
                  Upcoming Events
                </Typography>
                {activeEvents.length > 0 ? (
                  <Grid container spacing={1}>
                    {activeEvents.map((event) => (
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
                ) : (
                  <img
                    src={noUpcomingEvents}
                    width={"30%"}
                    style={{ textAlign: "center" }}
                  />
                )}
              </div>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <Grid container sx={{ ml: 3, mt: 3 }} spacing={1}>
              <div
                style={{
                  marginRight: "auto",
                  marginBottom: "1rem",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "30px",
                    fontWeight: "800",
                    m: "0 auto 1rem .5rem",
                    fontFamily: "nunito, sans-serif",
                  }}
                >
                  Past Events
                </Typography>
                {inactiveEvents.length > 0 ? (
                  <Grid container spacing={1}>
                    {inactiveEvents.map((event, index) => (
                      <Link
                        to={`/event/${event.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <ItemCard event={event} />
                      </Link>
                    ))}
                  </Grid>
                ) : (
                  <img
                    src={noPastEvents}
                    width={"30%"}
                    style={{ textAlign: "center" }}
                  />
                )}
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
