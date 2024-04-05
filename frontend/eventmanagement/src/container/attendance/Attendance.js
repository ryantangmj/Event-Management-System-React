import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useParams } from "react-router-dom";
import DataTable from "./DataTable.js";
import { CssBaseline } from "@mui/material";
import Footer from "../../components/Footer/foooter.jsx";
import Navbar from "../../components/Navbar/navbar.jsx";

export default function Attendance() {
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
          <DataTable id={id} />
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
