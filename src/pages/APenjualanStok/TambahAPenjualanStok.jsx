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

const TambahAPenjualanStok = () => {
  const { id } = useParams();
  const [kodeStok, setKodeStok] = useState("");
  const [barcode, setBarcode] = useState("");
  const [qty, setQty] = useState("");
  const [hargaSatuan, setHargaSatuan] = useState("");
  const navigate = useNavigate();
  const [stoks, setStok] = useState([]);
  const [penjualanStoks, setPenjualanStok] = useState([]);
  const [loading, setLoading] = useState(false);

  const stokOptions = stoks.map((stok) => ({
    label: `${stok.kodeStok} - ${stok.namaStok}`
  }));

  const barcodeOptions = stoks.map((stok) => ({
    label: `${stok.kodeBarcode}`
  }));

  useEffect(() => {
    getStoks();
    getPenjualanStoks();
  }, []);

  useEffect(() => {
    getHargaSatuan();
  }, [kodeStok]);

  const getStoks = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/stokMainInfo`);
    setStok(response.data);
    setLoading(false);
  };

  const getHargaSatuan = async () => {
    if (kodeStok) {
      const response = await axios.get(
        `${tempUrl}/stokByKodeStok/${kodeStok.split(" ", 1)[0]}`
      );
      response.data && setHargaSatuan(response.data.hargaJualKecil);
    } else {
      setHargaSatuan("");
    }
  };

  const getPenjualanStoks = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/penjualanStoks/${id}`);
    setPenjualanStok(response.data);
    setLoading(false);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const findByKodeStok = await axios.post(
        `${tempUrl}/aPenjualanStokByKodeStok`,
        {
          nomorNota: penjualanStoks.nomorNota,
          kodeStok: kodeStok.split(" ", 1)[0]
        }
      );
      if (findByKodeStok.data !== null) {
        await axios.patch(
          `${tempUrl}/aPenjualanStoks/${findByKodeStok.data._id}`,
          {
            qty: parseInt(findByKodeStok.data.qty) + parseInt(qty),
            total: parseInt(findByKodeStok.data.total) + hargaSatuan * qty
          }
        );
      } else {
        await axios.post(`${tempUrl}/aPenjualanStoks`, {
          nomorNota: penjualanStoks.nomorNota,
          kodeStok: kodeStok.split(" ", 1)[0],
          qty,
          hargaSatuan,
          total: hargaSatuan * qty
        });
      }
      await axios.patch(`${tempUrl}/penjualanStoks/${id}`, {
        total: penjualanStoks.total + hargaSatuan * qty
      });
      const findStok = stoks.find(
        (stok) => stok.kodeStok === kodeStok.split(" ", 1)[0]
      );
      const newQty = parseInt(findStok.qty) - parseInt(qty);
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
        Tambah Stok Penjualan
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
            onInputChange={(e, value) => {
              setKodeStok(value);
              let findBarcode = stoks.find(
                (stok) => stok.kodeStok === value.split(" ", 1)[0]
              );
              findBarcode && setBarcode(`${findBarcode.kodeBarcode}`);
            }}
            value={{ label: kodeStok }}
            sx={textFieldStyle}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={barcodeOptions}
            renderInput={(params) => <TextField {...params} label="Barcode" />}
            onInputChange={(e, value) => {
              setBarcode(value);
              let findKodeStok = stoks.find(
                (stok) => stok.kodeBarcode === value
              );
              findKodeStok &&
                setKodeStok(
                  `${findKodeStok.kodeStok} - ${findKodeStok.namaStok}`
                );
            }}
            value={{ label: barcode }}
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
        <Button variant="contained" startIcon={<SaveIcon />} onClick={saveUser}>
          Simpan
        </Button>
      </Box>
      <Divider sx={dividerStyle} />
    </Box>
  );
};

export default TambahAPenjualanStok;

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
  fontWeight: "600"
};

const hargaTextField = {
  display: "flex"
};
