import * as React from "react";
import "../../index.css";
import logo from "../../assets/logo.png";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { CssBaseline } from "@mui/material";

function Navbar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("jwtToken");
    window.location.href = "/";
  }

  return (
    <>
      <CssBaseline />
      <div
        sx={{
          boxShadow: 5,
          color: "#EFBC9B",
          mx: 0,
        }}
      >
        <AppBar
          position="fixed"
          sx={{
            boxShadow: 0,
            bgcolor: "#EFBC9B",
            pb: 2.5,
            pt: 1.5,
          }}
        >
          <Container maxWidth="lg">
            <Toolbar
              variant="regular"
              sx={(theme) => ({
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexShrink: 0,
                maxHeight: 40,
              })}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  ml: "-15%",
                  px: 0,
                }}
              >
                <a href="/home">
                  <Box
                    display="flex"
                    id="image"
                    component="img"
                    sx={{
                      mt: 4,
                      mr: "0.2vw",
                      mb: "1vw",
                      alignSelf: "flex-start",
                      height: 150,
                      objectFit: "cover",
                    }}
                    src={logo}
                    alt="Logo"
                  />
                </a>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-between",
                    flexDirection: "row",
                    pt: 1,
                  }}
                >
                  <MenuItem
                    onClick={() => navigate("/hostedEvents")}
                    sx={{
                      py: "0px",
                      px: "12px",
                      fontFamily: "nunito, sans-serif",
                      color: "#9CAFAA",
                    }}
                  >
                    <Typography
                      color="#FBF3D5"
                      sx={{
                        fontFamily: "open sans, sans-serif",
                        fontWeight: "750",
                        fontSize: { xs: "0.9rem", md: "0.9rem" },
                        letterSpacing: "0.5px",
                        gap: { xs: "none", md: "10px" },
                        mt: { xs: 2, md: 7 },
                        pb: 4.4,
                      }}
                    >
                      HOSTED EVENTS
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => navigate("/attendedEvents")}
                    sx={{
                      py: "0px",
                      px: "12px",
                      fontFamily: "nunito, sans-serif",
                      color: "#9CAFAA",
                    }}
                  >
                    <Typography
                      color="#FBF3D5"
                      sx={{
                        fontFamily: "open sans, sans-serif",
                        fontWeight: "750",
                        fontSize: { xs: "0.9rem", md: "0.9rem" },
                        letterSpacing: "0.5px",
                        gap: { xs: "none", md: "10px" },
                        mt: { xs: 2, md: 7 },
                        pb: 4.4,
                      }}
                    >
                      REGISTERED EVENTS
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => navigate("/profile")}
                    sx={{
                      py: "0px",
                      px: "12px",
                      fontFamily: "nunito, sans-serif",
                    }}
                  >
                    <Typography
                      color="#FBF3D5"
                      sx={{
                        fontFamily: "open sans, sans-serif",
                        fontWeight: "750",
                        fontSize: { xs: "0.9rem", md: "0.9rem" },
                        letterSpacing: "0.5px",
                        gap: { xs: "none", md: "10px" },
                        mt: { xs: 2, md: 7 },
                        pb: 4.4,
                      }}
                    >
                      PROFILE
                    </Typography>
                  </MenuItem>
                </Box>
              </Box>
              <Button
                color="primary"
                variant="text"
                size="small"
                component="a"
                onClick={logout}
                sx={{
                  display: "flex",
                  width: "18%",
                  fontFamily: "nunito, sans-serif",
                  backgroundColor: "#9CAFAA",
                  color: "#FBF3D5",
                  fontWeight: "700",
                  fontSize: "1rem",
                  padding: "3px",
                  borderRadius: "15px",
                  minWidth: "70px",
                  mr: "-15%",
                  "&:hover": {
                    backgroundColor: "#D6DAC8",
                    color: "#FFF",
                  },
                  mt: 3,
                }}
              >
                Log Out
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    </>
  );
}

export default Navbar;
