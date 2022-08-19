import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { tempUrl } from "../../contexts/ContextProvider";
import { Loader } from "../../components";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const UbahAPenjualanStok = () => {
  const [kodeStok, setKodeStok] = useState("");
  const [oldQty, setOldQty] = useState("");
  const [qty, setQty] = useState("");
  const [hargaSatuan, setHargaSatuan] = useState("");
  const [total, setTotal] = useState("");
  const [penjualanTotal, setPenjualanTotal] = useState("");
  const [stoks, setStok] = useState([]);
  const navigate = useNavigate();
  const { id, idAPenjualanStok } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserById();
    getPenjualanById();
    getStoks();
  }, []);

  const getUserById = async () => {
    setLoading(true);
    const response = await axios.get(
      `${tempUrl}/aPenjualanStoks/${idAPenjualanStok}`
    );
    setKodeStok(response.data.kodeStok);
    setOldQty(response.data.qty);
    setQty(response.data.qty);
    setHargaSatuan(response.data.hargaSatuan);
    setTotal(response.data.total);
    setLoading(false);
  };

  const getPenjualanById = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/penjualanStoks/${id}`);
    setPenjualanTotal(response.data.total);
    setLoading(false);
  };

  const getStoks = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/stokMainInfo`);
    setStok(response.data);
    setLoading(false);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    let newTotal;
    if (hargaSatuan * qty === total) {
      newTotal = penjualanTotal;
    } else {
      newTotal = penjualanTotal + (hargaSatuan * qty - total);
    }
    try {
      setLoading(true);
      await axios.patch(`${tempUrl}/penjualanStoks/${id}`, {
        total: hargaSatuan * qty
      });
      await axios.patch(`${tempUrl}/aPenjualanStoks/${idAPenjualanStok}`, {
        qty,
        total: newTotal
      });
      const findStok = stoks.find((stok) => stok.kodeStok === kodeStok);
      const countQty = qty - oldQty;
      const newQty = parseInt(findStok.qty) - parseInt(countQty);
      await axios.patch(`${tempUrl}/stoks/${findStok._id}`, {
        qty: newQty
      });
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
        Ubah Entry Penjualan Retail
      </Typography>
      <Divider sx={dividerStyle} />
      <Box sx={showDataContainer}>
        <Box sx={showDataWrapper}>
          <TextField
            id="outlined-basic"
            label="Quantity"
            variant="outlined"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />
          <Box sx={hargaContainer}>
            <Typography sx={hargaText}>
              Harga Satuan :
              {hargaSatuan !== 0 &&
                !isNaN(parseInt(hargaSatuan)) &&
                ` Rp ${parseInt(hargaSatuan).toLocaleString()}`}
            </Typography>
          </Box>
          <Box sx={hargaContainer}>
            <Typography sx={hargaText}>
              Total :
              {hargaSatuan * qty !== 0 &&
                !isNaN(parseInt(hargaSatuan * qty)) &&
                ` Rp ${parseInt(hargaSatuan * qty).toLocaleString()}`}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={textFieldStyle}>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={updateUser}
        >
          Ubah
        </Button>
      </Box>
      <Divider sx={dividerStyle} />
    </Box>
  );
};

export default UbahAPenjualanStok;

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

const textFieldStyle = {
  mt: 4
};

const textFieldResponsive = {
  mt: {
    xs: 4,
    sm: 0
  }
};

const hargaContainer = {
  marginTop: 2.5
};

const hargaText = {
  fontWeight: "600"
};
