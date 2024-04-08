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
  const { id } = useParams();

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
            />
          </Container>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
