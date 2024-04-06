import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import RegisterMain from "./RegisterMain.js";
import { CssBaseline } from "@mui/material";
import Footer from "../../components/Footer/foooter.jsx";

export default function Register() {
  return (
    <Box>
      <CssBaseline />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <RegisterMain />
      </Container>
      <Footer />
    </Box>
  );
}
