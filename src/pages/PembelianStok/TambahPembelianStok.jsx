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
  Autocomplete,
  Snackbar,
  Alert
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const TambahPembelianStok = () => {
  const [open, setOpen] = useState(false);
  const [nomorNota, setNomorNota] = useState("");
  const [jenis, setJenis] = useState("");
  const [kodeSupplier, setKodeSupplier] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [error, setError] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const jenisTransaksi = [{ label: "TUNAI" }, { label: "KREDIT" }];

  const supplierOptions = suppliers.map((supplier) => ({
    label: `${supplier.kodeSupplier} - ${supplier.namaSupplier}`
  }));

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    getSupplier();
  }, []);

  const getSupplier = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/suppliers`);
    setSuppliers(response.data);
    setLoading(false);
  };

  const saveUser = async (e) => {
    e.preventDefault();

    if (
      nomorNota.length === 0 ||
      tanggal.length === 0 ||
      jenis.length === 0 ||
      kodeSupplier.length === 0
    ) {
      setError(true);
      setOpen(!open);
    } else {
      try {
        setLoading(true);
        await axios.post(`${tempUrl}/pembelianStoks`, {
          nomorNota,
          tanggal,
          jenis,
          kodeSupplier
        });
        setLoading(false);
        navigate("/daftarPembelianStok");
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
        Tambah Pembelian
      </Typography>
      <Divider sx={dividerStyle} />
      <Box sx={textFieldContainer}>
        <Box sx={textFieldWrapper}>
          <TextField
            error={error && nomorNota.length === 0 && true}
            helperText={
              error && nomorNota.length === 0 && "Nomor Nota harus diisi!"
            }
            id="outlined-basic"
            label="Nomor Nota"
            variant="outlined"
            value={nomorNota}
            onChange={(e) => setNomorNota(e.target.value)}
          />
          <TextField
            error={error && tanggal.length === 0 && true}
            helperText={error && tanggal.length === 0 && "Tanggal harus diisi!"}
            id="outlined-basic"
            label="Tanggal"
            variant="outlined"
            sx={textFieldStyle}
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={jenisTransaksi}
            sx={textFieldStyle}
            renderInput={(params) => (
              <TextField
                error={error && jenis.length === 0 && true}
                helperText={error && jenis.length === 0 && "Jenis harus diisi!"}
                {...params}
                label="Jenis Transaksi"
              />
            )}
            onInputChange={(e, value) => setJenis(value)}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={supplierOptions}
            renderInput={(params) => (
              <TextField
                error={error && kodeSupplier.length === 0 && true}
                helperText={
                  error &&
                  kodeSupplier.length === 0 &&
                  "Kode Supplier harus diisi!"
                }
                {...params}
                label="Kode Groups"
              />
            )}
            onInputChange={(e, value) =>
              setKodeSupplier(value.split(" ", 1)[0])
            }
            sx={textFieldStyle}
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

export default TambahPembelianStok;

const container = {
  pt: 10
};

const subTitleText = {
  fontWeight: "900"
};

const dividerStyle = {
  mt: 2
};

const textFieldContainer = {
  mt: 4,
  display: "flex",
  flexDirection: {
    xs: "column",
    sm: "row"
  }
};

const textFieldWrapper = {
  display: "flex",
  flex: 1,
  flexDirection: "column",
  maxWidth: {
    md: "40vw"
  }
};

const textFieldStyle = {
  mt: 4
};

const alertBox = {
  width: "100%"
};
