import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Alert } from "@mui/material";

const ProtectedRoute = () => {
  const navigate = useNavigate();

  const loginButtonHandler = () => {
    navigate("/login");
  };

  const signupButtonHandler = () => {
    navigate("/signup");
  };

  return (
    <Box sx={container}>
      <Alert severity="error">Maaf Anda tidak memiliki akses!</Alert>
      <Box sx={alternativeContainer}>
        <Typography>Login dengan akun yang terotorisasi!</Typography>
        <Typography sx={daftarStyle} onClick={loginButtonHandler}>
          Login
        </Typography>
      </Box>
      <Box sx={alternativeContainer}>
        <Typography>Belum ada akun?</Typography>
        <Typography sx={daftarStyle} onClick={signupButtonHandler}>
          Daftar
        </Typography>
      </Box>
    </Box>
  );
};

export default ProtectedRoute;

const container = {
  pt: 10
};

const daftarStyle = {
  marginLeft: 0.5,
  color: "blue",
  cursor: "pointer",
  "&:hover": { fontWeight: "600", textDecoration: "underline" }
};

const alternativeContainer = {
  display: "flex",
  marginTop: 1
};
