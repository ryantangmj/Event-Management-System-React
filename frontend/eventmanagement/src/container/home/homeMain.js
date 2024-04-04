import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ItemCard from "./itemCard.js";
import Navbar from "../../components/Navbar/navbar.jsx";
import Footer from "../../components/Footer/foooter.jsx";

export default function Home() {
  return (
    <Box>
      <Navbar />
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
          <Grid container spacing={1} justifyContent="center">
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
          </Grid>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
