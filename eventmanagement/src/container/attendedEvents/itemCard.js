import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";

export default function ItemCard() {
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
        {/* Custom title based on merchant uploads */}
        <Typography
          component="div"
          fontFamily="open sans, sans-serif"
          sx={{
            fontSize: isMobile ? 15 : 19,
            fontWeight: 550,
            maxWidth: isMobile ? "200px" : "275px",
            display: "inline-block",
            wordWrap: "break-word",
            lineHeight: "1.2",
            mb: 0.2,
          }}
        >
          "Event Titile"
          {/* Norwegian Salmon (100g) */}
        </Typography>
        {/* Custom number of days based on merchant uploads */}
        <Typography
          sx={{ mb: 1.5, fontSize: isMobile ? 11 : 14 }}
          color="text.secondary"
          fontFamily="open sans, sans-serif"
        >
          Event Date
        </Typography>
        {/* Custom price based on merchant uploads */}
        <Typography
          fontWeight={800}
          fontFamily="nunito, sans-serif"
          sx={{ mt: -0.7, fontSize: isMobile ? 18 : 22 }}
        >
          Event Description
        </Typography>
      </CardContent>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <CardContent
          sx={{
            mt: isMobile ? -3.5 : -3,
          }}
        ></CardContent>
      </Stack>
    </Card>
  );
}
