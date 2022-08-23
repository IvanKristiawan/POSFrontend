import React, { useState, useEffect } from "react";
import axios from "axios";
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

const UbahGroupStok = () => {
  const [open, setOpen] = useState(false);
  const [kodeGroup, setKodeGroup] = useState("");
  const [namaGroup, setNama] = useState("");
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
    const response = await axios.get(`${tempUrl}/groupStoks/${id}`);
    setKodeGroup(response.data.kodeGroup);
    setNama(response.data.namaGroup);
    setLoading(false);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    if (kodeGroup.length === 0 || namaGroup.length === 0) {
      setError(true);
      setOpen(!open);
    } else {
      try {
        setLoading(true);
        await axios.patch(`${tempUrl}/groupStoks/${id}`, {
          kodeGroup,
          namaGroup
        });
        setLoading(false);
        navigate("/groupStok");
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
      <Typography color="#757575">Master</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Ubah Group Stok
      </Typography>
      <Divider sx={dividerStyle} />
      <Box sx={showDataContainer}>
        <Box sx={showDataWrapper}>
          <TextField
            error={error && kodeGroup.length === 0 && true}
            helperText={error && kodeGroup.length === 0 && "Kode harus diisi!"}
            id="outlined-basic"
            label="Kode"
            variant="outlined"
            value={kodeGroup}
            onChange={(e) => setKodeGroup(e.target.value)}
          />
          <TextField
            error={error && namaGroup.length === 0 && true}
            helperText={
              error && namaGroup.length === 0 && "Nama Group Stok harus diisi!"
            }
            id="outlined-basic"
            label="Nama Group Stok"
            variant="outlined"
            sx={spacingTop}
            value={namaGroup}
            onChange={(e) => setNama(e.target.value)}
          />
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

export default UbahGroupStok;

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
