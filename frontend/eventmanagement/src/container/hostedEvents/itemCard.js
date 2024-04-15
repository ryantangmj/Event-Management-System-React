import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import TodayIcon from "@mui/icons-material/Today";
import MapIcon from "@mui/icons-material/Map";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Singapore",
  };
  return new Intl.DateTimeFormat("en-GB", options)
    .format(date)
    .replace(",", "");
}

function getDays(deadlineString) {
  console.log(deadlineString);
  const cleanedDateString = deadlineString.replace("[UTC]", "");
  const deadline = new Date(cleanedDateString);
  console.log(deadline);
  const today = new Date();
  const diffTime = deadline - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export default function ItemCard({ event, index }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      sx={{
        position: "relative",
        maxWidth: isMobile ? 150 : 300,
        minHeight: 500,
        borderRadius: "8px",
        m: 2,
        ":hover": {
          boxShadow: 20,
        },
      }}
    >
      <CardMedia
        sx={{
          height: 220,
          width: 300,
        }}
        image={event.imageURL}
        alt="Product Image"
        title="Listing Photo"
      />
      <CardContent>
        <div
          key={index}
          style={{
            padding: "5px",
            borderRadius: "8px",
            margin: "10px",
            minHeight: "160px",
          }}
        >
          <Typography
            component="div"
            fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
            sx={{
              fontSize: isMobile ? "1rem" : "1.5rem",
              fontWeight: "bold",
              maxWidth: isMobile ? "200px" : "275px",
              display: "block",
              wordWrap: "break-word",
              lineHeight: "1.4",
              mb: "8px",
              color: "#333",
            }}
          >
            {event.title}
          </Typography>

          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              mb: "12px",
              fontSize: "1.2rem",
              color: "#666",
            }}
            fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
          >
            <TodayIcon
              sx={{ fontSize: "1.3rem", marginRight: "4px", marginTop: 0.3 }}
            />
            {formatDate(event.date.replace("[UTC]", ""))}
          </Typography>

          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              mb: "12px",
              fontSize: "1.2rem",
              color: "#666",
            }}
            fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
          >
            <MapIcon
              sx={{ fontSize: "1.3rem", marginRight: "4px", marginTop: 0.3 }}
            />
            {event.location}
          </Typography>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              mb: "12px",
              fontSize: "1.2rem",
              color: "#666",
            }}
            fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
          >
            <HourglassEmptyIcon
              sx={{ fontSize: "1.3rem", marginRight: "4px", marginTop: 0.1 }}
            />
            {getDays(event.deadline)} days left to register!
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
