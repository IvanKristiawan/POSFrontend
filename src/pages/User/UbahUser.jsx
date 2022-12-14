import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { tempUrl } from "../../contexts/ContextProvider";
import { Loader } from "../../components";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Snackbar,
  Alert
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const UbahUser = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [tipeUser, setTipeUser] = useState("");
  const [kodeNota, setKodeNota] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/users/${id}`, {
      tipeAdmin: user.tipeUser,
      id: user._id,
      token: user.token
    });
    setUsername(response.data.username);
    setTipeUser(response.data.tipeUser);
    setKodeNota(response.data.kodeNota);
    setLoading(false);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    if (
      username.length === 0 ||
      tipeUser.length === 0 ||
      kodeNota.length === 0
    ) {
      setError(true);
      setOpen(!open);
    } else {
      if (password.length === 0) {
        setPassword(user.password);
      }
      try {
        setLoading(true);
        await axios.put(`${tempUrl}/users/${id}`, {
          username,
          tipeUser,
          kodeNota,
          password,
          tipeAdmin: user.tipeUser,
          id: user._id,
          token: user.token
        });
        setLoading(false);
        navigate("/user");
      } catch (error) {
        console.log(error);
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
        Ubah User
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
            id="outlined-basic"
            label="Password (baru)"
            variant="outlined"
            type="password"
            sx={spacingTop}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Typography>
            *Kosongkan jika tidak ingin mengganti password
          </Typography>
        </Box>
      </Box>
      <Box sx={spacingTop}>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={updateUser}
        >
          Ubah
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

export default UbahUser;

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
