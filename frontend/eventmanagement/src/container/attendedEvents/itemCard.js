import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return new Intl.DateTimeFormat("en-GB", options)
    .format(date)
    .replace(",", "");
}

export default function ItemCard({ event }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      sx={{
        position: "relative",
        maxWidth: isMobile ? 150 : 275,
        borderRadius: "8px",
        mb: "1rem",
        m: 2,
      }}
    >
      <CardContent>
        <div
          style={{
            padding: "10px",
            borderRadius: "8px",
            margin: "10px",
          }}
        >
          <Typography
            component="div"
            fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
            sx={{
              fontSize: isMobile ? "1rem" : "1.7rem",
              fontWeight: "bold",
              maxWidth: isMobile ? "200px" : "275px",
              display: "block",
              wordWrap: "break-word",
              lineHeight: "1.4",
              mb: "8px",
              color: "#333",
            }}
          >
            Title: {event.title}
          </Typography>
          <Typography
            sx={{
              mb: "12px",
              fontSize: isMobile ? "0.85rem" : "1.25rem",
              color: "#666",
            }}
            fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
          >
            Date: {formatDate(event.date.replace("[UTC]", ""))}
          </Typography>
          <Typography
            fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
            sx={{
              mt: "-0.7",
              fontSize: isMobile ? "1rem" : "1rem",
              color: "#333",
              fontWeight: "normal",
              lineHeight: "1.6",
            }}
          >
            Description: {event.description}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
