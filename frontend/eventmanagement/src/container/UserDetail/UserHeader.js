import React, { useState, useEffect } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import Api from "../../helpers/Api";

export default function UserHeader(props) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await Api.getAccountByUserId(props.id);
        console.log(fetchedUser);
        setUser(fetchedUser);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, [props.id]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        padding: 2,
      }}
    >
      <Avatar
        alt="User profile picture"
        src={user.imageURL}
        sx={{ width: 150, height: 150 }}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          sx={{
            fontSize: "40px",
            fontWeight: "800",
            fontFamily: "nunito, sans-serif",
          }}
        >
          {user.name}
        </Typography>
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: "800",
            fontFamily: "nunito, sans-serif",
          }}
        >
          {user.email}
        </Typography>
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: "800",
            fontFamily: "nunito, sans-serif",
          }}
        >
          {user.contactDetails}
        </Typography>
      </Box>
    </Box>
  );
}
