import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FacebookIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const logoStyle = {
  width: "140px",
  height: "auto",
};

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="#181B13"
      mt={1}
      fontFamily={"nunito, sans-serif"}
    >
      {"Copyright © "}
      <Link
        href="https://github.com/ryantangmj/Event-Management-System-React"
        color="#181B13"
      >
        Event Genesis
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#EFBC9B",
        width: "100vw",
        minHeight: "20vh",
        gap: { xs: 4, sm: 8 },
        py: { xs: 4, sm: 10 },
        textAlign: { sm: "center", md: "left" },
        fontFamily: "nunito, sans-serif",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pt: { xs: 4, sm: 8 },
          width: "100%",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box sx={{ ml: 2 }}>
          <Link
            color="text.secondary"
            href="https://policies.google.com/privacy?hl=en"
          >
            Privacy Policy
          </Link>
          <Typography display="inline" sx={{ mx: 0.5, opacity: 0.5 }}>
            &nbsp;•&nbsp;
          </Typography>
          <Link
            color="text.secondary"
            href="https://policies.google.com/terms?hl=en-US"
          >
            Terms of Service
          </Link>
          <Copyright />
        </Box>
        <Stack
          direction="row"
          justifyContent="left"
          spacing={1}
          useFlexGap
          sx={{
            color: "text.secondary",
            pr: 2,
          }}
        >
          <IconButton
            color="inherit"
            href="https://github.com/ryantangmj/Event-Management-System-React"
            aria-label="GitHub"
            sx={{ alignSelf: "center" }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href="https://www.linkedin.com/in/ryantangmj"
            aria-label="LinkedIn"
            sx={{ alignSelf: "center" }}
          >
            <LinkedInIcon />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
}
