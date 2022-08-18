import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Box, TextField, Typography, Divider, Button } from "@mui/material";
import { Loader } from "../../components";
import { tempUrl } from "../../contexts/ContextProvider";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const TampilAPembelianStok = () => {
  const { id, idAPembelianStok } = useParams();
  const navigate = useNavigate();
  const [kodeStok, setKodeStok] = useState("");
  const [qty, setQty] = useState("");
  const [hargaSatuan, setHargaSatuan] = useState("");
  const [potongan, setPotongan] = useState("");
  const [subtotal, setSubTotal] = useState("");
  const [stoks, setStok] = useState([]);
  const [pembelianStoks, setPembelianStok] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStoks();
    getPembelianStoks();
    getUserById();
  }, []);

  const getStoks = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/stoks`);
    setStok(response.data);
    setLoading(false);
  };

  const getPembelianStoks = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/pembelianStoks/${id}`);
    setPembelianStok(response.data);
    setLoading(false);
  };

  const getUserById = async () => {
    if (id) {
      const response = await axios.get(
        `${tempUrl}/aPembelianStoks/${idAPembelianStok}`
      );
      setKodeStok(response.data.kodeStok);
      setQty(response.data.qty);
      setHargaSatuan(response.data.hargaSatuan);
      setPotongan(response.data.potongan);
      setSubTotal(response.data.subtotal);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      const findStok = stoks.find((stok) => stok.kodeStok == kodeStok);
      const newQty = parseInt(findStok.qty) - parseInt(qty);
      await axios.patch(`${tempUrl}/stoks/${findStok._id}`, {
        qty: newQty
      });
      await axios.patch(`${tempUrl}/pembelianStoks/${id}`, {
        total: pembelianStoks.total - subtotal
      });
      await axios.delete(`${tempUrl}/aPembelianStoks/${idAPembelianStok}`);
      setKodeStok("");
      setQty("");
      setHargaSatuan("");
      setPotongan("");
      setSubTotal("");
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
        Stok Pembelian
      </Typography>
      <Box sx={deleteButtonContainer}>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteOutlineIcon />}
          sx={{ textTransform: "none" }}
          onClick={() => deleteUser(id)}
        >
          Hapus
        </Button>
      </Box>
      <Divider sx={dividerStyle} />
      <Box sx={textFieldContainer}>
        <Box sx={textFieldWrapper}>
          <TextField
            id="outlined-basic"
            label="Kode Stok"
            variant="filled"
            sx={textFieldStyle}
            InputProps={{
              readOnly: true
            }}
            value={kodeStok}
          />
          <TextField
            id="outlined-basic"
            label="Quantity"
            variant="filled"
            sx={textFieldStyle}
            InputProps={{
              readOnly: true
            }}
            value={qty.toLocaleString()}
          />
          <TextField
            id="outlined-basic"
            label="Harga Satuan"
            variant="filled"
            sx={textFieldStyle}
            InputProps={{
              readOnly: true
            }}
            value={hargaSatuan.toLocaleString()}
          />
          <TextField
            id="outlined-basic"
            label="Potongan"
            variant="filled"
            sx={textFieldStyle}
            InputProps={{
              readOnly: true
            }}
            value={`${potongan}%`}
          />
          <TextField
            id="outlined-basic"
            label="Subtotal"
            variant="filled"
            sx={textFieldStyle}
            InputProps={{
              readOnly: true
            }}
            value={subtotal.toLocaleString()}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TampilAPembelianStok;

const container = {
  pt: 10
};

const subTitleText = {
  fontWeight: "900"
};

const deleteButtonContainer = {
  mt: 4,
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center"
};

const dividerStyle = {
  pt: 4
};

const textFieldContainer = {
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
  display: "flex",
  mt: 4
};
