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
import SaveIcon from "@mui/icons-material/Save";

const TambahUser = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [tipeUser, setTipeUser] = useState("");
  const [kodeNota, setKodeNota] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const saveUser = async (e) => {
    if (
      username.length === 0 ||
      password.length === 0 ||
      tipeUser.length === 0 ||
      kodeNota.length === 0
    ) {
      setError(true);
      setOpen(!open);
    } else {
      try {
        const res = await axios.post(`${tempUrl}/auth/register`, {
          username,
          password,
          tipeUser,
          kodeNota
        });
        navigate("/user");
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={container}>
      <Typography color="#757575">User</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Tambah User
      </Typography>
      <Divider sx={dividerStyle} />
      <Box sx={showDataContainer}>
        <Box sx={showDataWrapper}>
          <TextField
            error={error && username.length === 0 && true}
            helperText={
              error && username.length === 0 && "Username harus diisi!"
            }
            id="outlined-basic"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            error={error && tipeUser.length === 0 && true}
            helperText={
              error && tipeUser.length === 0 && "Tipe User harus diisi!"
            }
            id="outlined-basic"
            label="Tipe User"
            variant="outlined"
            sx={spacingTop}
            value={tipeUser}
            onChange={(e) => setTipeUser(e.target.value)}
          />
          <TextField
            error={error && kodeNota.length === 0 && true}
            helperText={
              error && kodeNota.length === 0 && "Kode Nota harus diisi!"
            }
            id="outlined-basic"
            label="Kode Nota"
            variant="outlined"
            sx={spacingTop}
            value={kodeNota}
            onChange={(e) => setKodeNota(e.target.value)}
          />
          <TextField
            error={error && password.length === 0 && true}
            helperText={
              error && password.length === 0 && "Password harus diisi!"
            }
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            sx={spacingTop}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
      </Box>
      <Box sx={spacingTop}>
        <Button variant="contained" startIcon={<SaveIcon />} onClick={saveUser}>
          Simpan
        </Button>
      </Box>
      <Divider sx={dividerStyle} />
      {error && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={alertBox}>
            Data belum terisi semua!
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default TambahUser;

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

const alertBox = {
  width: "100%"
};
