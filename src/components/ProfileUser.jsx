import * as React from "react";
import { Stack, Avatar, Typography, Tooltip } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function ProfileUser() {
  return (
    <Tooltip title="Profile">
      <Stack
        direction="row"
        spacing={1}
        sx={{
          ml: "auto",
          p: 1,
          cursor: "pointer",
          borderRadius: "16px",
          backgroundColor: "primary.light",
          transition: "0.3s",
          "&:hover": { backgroundColor: "#90caf9" }
        }}
        onClick={() => alert("Clicked")}
      >
        <Avatar
          alt="Ivan Kristiawan"
          sx={{ width: 30, height: 30 }}
          src="https://avatars.githubusercontent.com/u/101783828?s=40&v=4"
        />
        <Stack direction="row">
          <Typography
            noWrap
            component="p"
            sx={{ color: "#eeeeee", my: "auto" }}
          >
            Hai,
          </Typography>
          <Typography
            noWrap
            component="p"
            sx={{ color: "#eeeeee", fontWeight: "bold", mx: 1, my: "auto" }}
          >
            Ivan
          </Typography>
          <ArrowDropDownIcon sx={{ color: "white", my: "auto" }} />
        </Stack>
      </Stack>
    </Tooltip>
  );
}

export default ProfileUser;
