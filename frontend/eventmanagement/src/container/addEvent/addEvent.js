import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AddEventDetails from "./EventMain.js";
import { CssBaseline } from "@mui/material";
import Navbar from "../../components/Navbar/navbar.jsx";
import Footer from "../../components/Footer/foooter.jsx";

export default function AddEvent() {
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
        <CssBaseline />
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pt: "7rem",
          }}
        >
          <AddEventDetails />
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
