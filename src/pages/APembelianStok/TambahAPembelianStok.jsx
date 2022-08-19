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
  Autocomplete
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const TambahAPembelianStok = () => {
  const { id } = useParams();
  const [kodeStok, setKodeStok] = useState("");
  const [qty, setQty] = useState("");
  const [hargaSatuan, setHargaSatuan] = useState("");
  const [potongan, setPotongan] = useState("");
  const [subtotal, setSubTotal] = useState(0);
  const navigate = useNavigate();
  const [stoks, setStok] = useState([]);
  const [pembelianStoks, setPembelianStok] = useState([]);
  const [loading, setLoading] = useState(false);

  const stokOptions = stoks.map((stok) => ({
    label: `${stok.kodeStok} - ${stok.namaStok}`
  }));

  useEffect(() => {
    getStoks();
    getPembelianStoks();
  }, []);

  const getStoks = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/stokMainInfo`);
    setStok(response.data);
    setLoading(false);
  };

  const getPembelianStoks = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/pembelianStoks/${id}`);
    setPembelianStok(response.data);
    setLoading(false);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`${tempUrl}/aPembelianStoks`, {
        nomorNota: pembelianStoks.nomorNota,
        kodeStok,
        qty,
        hargaSatuan,
        potongan,
        subtotal: hargaSatuan * qty - (hargaSatuan * qty * potongan) / 100
      });
      await axios.patch(`${tempUrl}/pembelianStoks/${id}`, {
        total:
          pembelianStoks.total +
          hargaSatuan * qty -
          (hargaSatuan * qty * potongan) / 100
      });
      const findStok = stoks.find((stok) => stok.kodeStok === kodeStok);
      const newQty = parseInt(findStok.qty) + parseInt(qty);
      await axios.patch(`${tempUrl}/stoks/${findStok._id}`, {
        qty: newQty
      });
      setLoading(false);
      navigate(`/daftarPembelianStok/pembelianStok/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={container}>
      <Typography color="#757575">Transaksi</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Tambah Stok Pembelian
      </Typography>
      <Divider sx={dividerStyle} />
      <Box sx={textFieldContainer}>
        <Box sx={textFieldWrapper}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={stokOptions}
            renderInput={(params) => (
              <TextField {...params} label="Kode Stok" />
            )}
            onInputChange={(e, value) => setKodeStok(value.split(" ", 1)[0])}
            sx={textFieldStyle}
          />
          <TextField
            id="outlined-basic"
            label="Quantity"
            variant="outlined"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            sx={textFieldStyle}
          />
          <Box sx={hargaContainer}>
            <Typography sx={hargaText}>
              Harga Satuan
              {hargaSatuan !== 0 &&
                !isNaN(parseInt(hargaSatuan)) &&
                ` : Rp ${parseInt(hargaSatuan).toLocaleString()}`}
            </Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              sx={hargaTextField}
              value={hargaSatuan}
              onChange={(e) => setHargaSatuan(e.target.value)}
            />
          </Box>
          <TextField
            id="outlined-basic"
            label="Potongan"
            variant="outlined"
            value={potongan}
            onChange={(e) => setPotongan(e.target.value)}
            sx={textFieldStyle}
          />
          <Box sx={hargaContainer}>
            <Typography sx={subTotalText}>
              Subtotal :
              {hargaSatuan * qty - (hargaSatuan * qty * potongan) / 100 !== 0 &&
                !isNaN(
                  parseInt(
                    hargaSatuan * qty - (hargaSatuan * qty * potongan) / 100
                  )
                ) &&
                ` Rp ${parseInt(
                  hargaSatuan * qty - (hargaSatuan * qty * potongan) / 100
                ).toLocaleString()}`}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={textFieldStyle}>
        <Button variant="contained" startIcon={<SaveIcon />} onClick={saveUser}>
          Simpan
        </Button>
      </Box>
      <Divider sx={dividerStyle} />
    </Box>
  );
};

export default TambahAPembelianStok;

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

const hargaContainer = {
  marginTop: 2.5
};

const hargaText = {
  fontWeight: "500",
  color: "gray"
};

const hargaTextField = {
  display: "flex"
};

const subTotalText = {
  fontWeight: "600"
};
