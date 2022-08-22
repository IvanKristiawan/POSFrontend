import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  Avatar,
  Typography,
  Tooltip,
  ButtonGroup,
  Button
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

function ProfileUser() {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutButtonHandler = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const signupButtonHandler = () => {
    navigate("/signup");
  };

  const loginButtonHandler = () => {
    navigate("/login");
  };

  return (
    <>
      {user ? (
        <Stack direction="row" spacing={1} sx={containerAvatar}>
          <Avatar alt="Ivan Kristiawan" sx={avatarIcon}>
            {user.username.substring(0, 1)}
          </Avatar>
          <Stack direction="row">
            <Typography noWrap component="p" sx={greetingText}>
              Hai,
            </Typography>
            <Typography noWrap component="p" sx={usernameText}>
              {user.username}
            </Typography>
            <Tooltip title="Logout">
              <LogoutIcon sx={logoutStyle} onClick={logoutButtonHandler} />
            </Tooltip>
          </Stack>
        </Stack>
      ) : (
        <Box direction="row" spacing={1} sx={containerButtonGroup}>
          <Button sx={buttonUser} onClick={loginButtonHandler}>
            Login
          </Button>
        </Box>
      )}
    </>
  );
}

export default ProfileUser;

const containerAvatar = {
  ml: "auto",
  p: 1,
  borderRadius: "16px",
  backgroundColor: "primary.light"
};

const containerButtonGroup = {
  ml: "auto",
  p: 1,
  cursor: "pointer",
  borderRadius: "5px",
  backgroundColor: "white"
};

const buttonUser = {
  transition: "0.3s",
  padding: 0,
  "&:hover": { backgroundColor: "#90caf9", color: "black" }
};

const avatarIcon = {
  width: 30,
  height: 30,
  fontSize: "14px",
  bgcolor: "purple"
};

const greetingText = {
  color: "#eeeeee",
  my: "auto"
};

const usernameText = {
  color: "#eeeeee",
  fontWeight: "bold",
  mx: 1,
  my: "auto"
};

const logoutStyle = {
  color: "white",
  my: "auto",
  padding: "3px",
  cursor: "pointer",
  transition: "0.3s",
  "&:hover": { borderRadius: 2, backgroundColor: "#90caf9", color: "black" }
};
