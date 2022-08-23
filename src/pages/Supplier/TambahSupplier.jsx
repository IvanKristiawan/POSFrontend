import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
import SaveIcon from "@mui/icons-material/Save";

const TambahSupplier = () => {
  const [open, setOpen] = useState(false);
  const [kodeSupplier, setKodeSupplier] = useState("");
  const [namaSupplier, setNama] = useState("");
  const [alamatSupplier, setAlamat] = useState("");
  const [kota, setKota] = useState("");
  const [telp, setTelp] = useState("");
  const [npwp, setNpwp] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    getKodeSupplier();
  }, []);

  const getKodeSupplier = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/suppliersNextLength`);
    setKodeSupplier(response.data);
    setLoading(false);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    if (kodeSupplier.length === 0 || namaSupplier.length === 0) {
      setError(true);
      setOpen(!open);
    } else {
      try {
        setLoading(true);
        await axios.post(`${tempUrl}/suppliers`, {
          kodeSupplier,
          namaSupplier,
          alamatSupplier,
          kota,
          telp,
          npwp
        });
        setLoading(false);
        navigate("/supplier");
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
        Tambah Supplier
      </Typography>
      <Divider sx={dividerStyle} />
      <Box sx={showDataContainer}>
        <Box sx={showDataWrapper}>
          <TextField
            error={error && kodeSupplier.length === 0 && true}
            helperText={
              error && kodeSupplier.length === 0 && "Kode harus diisi!"
            }
            id="outlined-basic"
            label="Kode"
            variant="outlined"
            value={kodeSupplier}
            onChange={(e) => setKodeSupplier(e.target.value)}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            error={error && namaSupplier.length === 0 && true}
            helperText={
              error && namaSupplier.length === 0 && "Nama harus diisi!"
            }
            id="outlined-basic"
            label="Nama"
            variant="outlined"
            sx={textFieldStyle}
            value={namaSupplier}
            onChange={(e) => setNama(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Alamat"
            variant="outlined"
            sx={textFieldStyle}
            value={alamatSupplier}
            onChange={(e) => setAlamat(e.target.value)}
          />
        </Box>
        <Box sx={showDataBox}>
          <TextField
            id="outlined-basic"
            label="Kota"
            variant="outlined"
            sx={textFieldResponsive}
            value={kota}
            onChange={(e) => setKota(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Telpon"
            variant="outlined"
            sx={textFieldStyle}
            value={telp}
            onChange={(e) => setTelp(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="NPWP"
            variant="outlined"
            sx={textFieldStyle}
            value={npwp}
            onChange={(e) => setNpwp(e.target.value)}
          />
        </Box>
      </Box>
      <Box sx={textFieldStyle}>
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

export default TambahSupplier;

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
  mr: {
    xs: 0,
    sm: 10
  }
};

const showDataBox = {
  display: "flex",
  flex: 1,
  flexDirection: "column"
};

const textFieldStyle = {
  mt: 4
};

const textFieldResponsive = {
  mt: {
    xs: 4,
    sm: 0
  }
};

const alertBox = {
  width: "100%"
};
