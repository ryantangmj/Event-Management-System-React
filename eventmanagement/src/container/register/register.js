import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import RegisterMain from "./registerMain.js";
import { CssBaseline } from "@mui/material";


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
          height: "105vh",
        }}
      >
        <RegisterMain />
      </Container>
    </Box>
  );
}
