import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { tempUrl } from "../../contexts/ContextProvider";
import { Loader } from "../../components";
import {
  Box,
  Typography,
  Divider,
  Alert,
  Button,
  TextField,
  Snackbar
} from "@mui/material";
import { useForm } from "react-hook-form";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [kodeNota, setKodeNota] = useState("");
  const [password, setPassword] = useState("");
  const [loadingPage, setLoadingPage] = useState(false);

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleClick = async (e) => {
    dispatch({ type: "REGISTER_START" });
    try {
      const res = await axios.post(`${tempUrl}/auth/register`, {
        username,
        password,
        kodeNota
      });
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data.details });
      const res2 = await axios.post(`${tempUrl}/auth/login`, {
        username,
        password
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res2.data.details });
      navigate("/");
    } catch (err) {
      setOpen(true);
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const loginButtonHandler = () => {
    navigate("/login");
  };

  if (loadingPage) {
    return <Loader />;
  }

  return (
    <Box sx={container}>
      <form onSubmit={handleSubmit(handleClick)}>
        <Typography color="#757575">User</Typography>
        <Typography variant="h4" sx={subTitleText}>
          Sign Up
        </Typography>
        <Divider sx={dividerStyle} />
        <Box sx={showDataContainer}>
          <Box sx={showDataWrapper}>
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              value={username}
              {...register("username", {
                required: "Username harus diisi!"
              })}
              error={!!errors?.username}
              helperText={errors?.username ? errors.username.message : null}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Kode Nota"
              variant="outlined"
              sx={spacingTop}
              value={kodeNota}
              {...register("kodeNota", {
                required: "Kode Nota harus diisi!"
              })}
              error={!!errors?.kodeNota}
              helperText={errors?.kodeNota ? errors.kodeNota.message : null}
              onChange={(e) => setKodeNota(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              autoComplete="current-password"
              sx={spacingTop}
              value={password}
              {...register("password", {
                required: "Password harus diisi!"
              })}
              error={!!errors?.password}
              helperText={errors?.password ? errors.password.message : null}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
        </Box>
        <Box sx={spacingTop}>
          <Button type="submit" variant="contained">
            Sign up
          </Button>
          <Box sx={daftarContainer}>
            <Typography>Sudah punya akun?</Typography>
            <Typography sx={daftarStyle} onClick={loginButtonHandler}>
              Masuk
            </Typography>
          </Box>
        </Box>
        {error && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={alertBox}>
              Username atau Password salah!
            </Alert>
          </Snackbar>
        )}
        <Divider sx={spacingTop} />
      </form>
    </Box>
  );
};

export default Signup;

const container = {
  pt: 10
};

const subTitleText = {
  fontWeight: "900"
};

const dividerStyle = {
  mt: 2
};

const showDataContainer = {
  mt: 4,
  display: "flex",
  flexDirection: {
    xs: "column",
    sm: "row"
  }
};

const showDataWrapper = {
  display: "flex",
  flex: 1,
  flexDirection: "column",
  maxWidth: {
    md: "40vw"
  }
};

const spacingTop = {
  mt: 4
};

const daftarContainer = {
  display: "flex",
  marginTop: 1
};

const daftarStyle = {
  marginLeft: 0.5,
  color: "blue",
  cursor: "pointer",
  "&:hover": { fontWeight: "600", textDecoration: "underline" }
};

const alertBox = {
  width: "100%"
};
