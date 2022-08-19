import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  TextField,
  Typography,
  Divider,
  Button,
  ButtonGroup
} from "@mui/material";
import { Loader } from "../../components";
import { tempUrl } from "../../contexts/ContextProvider";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const TampilAPenjualanStok = () => {
  const { id, idAPenjualanStok } = useParams();
  const navigate = useNavigate();
  const [aPenjualanStokId, setAPenjualanStokId] = useState("");
  const [kodeStok, setKodeStok] = useState("");
  const [qty, setQty] = useState("");
  const [hargaSatuan, setHargaSatuan] = useState("");
  const [total, setTotal] = useState("");
  const [stoks, setStok] = useState([]);
  const [penjualanStoks, setPenjualanStok] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStoks();
    getPenjualanStoks();
    getUserById();
  }, []);

  const getStoks = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/stoks`);
    setStok(response.data);
    setLoading(false);
  };

  const getPenjualanStoks = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/penjualanStoks/${id}`);
    setPenjualanStok(response.data);
    setLoading(false);
  };

  const getUserById = async () => {
    if (id) {
      setLoading(true);
      const response = await axios.get(
        `${tempUrl}/aPenjualanStoks/${idAPenjualanStok}`
      );
      setAPenjualanStokId(response.data._id);
      setKodeStok(response.data.kodeStok);
      setQty(response.data.qty);
      setHargaSatuan(response.data.hargaSatuan);
      setTotal(response.data.total);
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      const findStok = stoks.find((stok) => stok.kodeStok === kodeStok);
      const newQty = parseInt(findStok.qty) + parseInt(qty);
      await axios.patch(`${tempUrl}/stoks/${findStok._id}`, {
        qty: newQty
      });
      await axios.patch(`${tempUrl}/penjualanStoks/${id}`, {
        total: penjualanStoks.total - total
      });
      await axios.delete(`${tempUrl}/aPenjualanStoks/${idAPenjualanStok}`);
      setKodeStok("");
      setQty("");
      setHargaSatuan("");
      setTotal("");
      setLoading(false);
      navigate(`/daftarPenjualanStok/penjualanStok/${id}`);
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
        Entry Penjualan Retail
      </Typography>
      <Box sx={buttonModifierContainer}>
        <ButtonGroup variant="contained">
          <Button
            color="primary"
            startIcon={<EditIcon />}
            sx={buttonStyle}
            onClick={() => {
              navigate(
                `/daftarPenjualanStok/penjualanStok/${id}/${aPenjualanStokId}/edit`
              );
            }}
          >
            Ubah
          </Button>
          <Button
            color="error"
            startIcon={<DeleteOutlineIcon />}
            sx={buttonStyle}
            onClick={() => deleteUser(id)}
          >
            Hapus
          </Button>
        </ButtonGroup>
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
            label="Tootal"
            variant="filled"
            sx={textFieldStyle}
            InputProps={{
              readOnly: true
            }}
            value={total.toLocaleString()}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TampilAPenjualanStok;

const container = {
  pt: 10
};

const subTitleText = {
  fontWeight: "900"
};

const buttonModifierContainer = {
  mt: 4,
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center"
};

const buttonStyle = {
  textTransform: "none"
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
