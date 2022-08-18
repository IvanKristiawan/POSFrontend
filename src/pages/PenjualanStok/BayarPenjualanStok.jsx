import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, TextField, Typography, Divider, Button } from "@mui/material";
import { Loader } from "../../components";
import { tempUrl } from "../../contexts/ContextProvider";
import SaveIcon from "@mui/icons-material/Save";

const BayarPenjualanStok = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const [loading, setLoading] = useState(false);
  const [nomorNota, setNomorNota] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [total, setTotal] = useState("");
  const [nonTunai, setNonTunai] = useState(0);
  const [tunai, setTunai] = useState(0);
  const [kembali, setKembali] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    id && getUserById();
  }, [id]);

  const getUserById = async () => {
    if (id) {
      const response = await axios.get(`${tempUrl}/penjualanStoks/${id}`);
      setNomorNota(response.data.nomorNota);
      setTanggal(response.data.tanggal);
      setTotal(response.data.total);
      setNonTunai(response.data.nonTunai);
      setTunai(response.data.tunai);
      setKembali(response.data.kembali);
    }
  };

  const saveUser = async (e) => {
    try {
      setLoading(true);
      const response = await axios.patch(`${tempUrl}/penjualanStoks/${id}`, {
        nomorNota,
        tanggal,
        total,
        nonTunai,
        tunai,
        kembali: !isNaN(parseInt(nonTunai) + parseInt(tunai) - parseInt(total))
          ? parseInt(nonTunai) + parseInt(tunai) - parseInt(total)
          : 0
      });
      setLoading(false);
      navigate(`/daftarPenjualanStok/penjualanStok/${response.data._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={container}>
      <Typography color="#757575">Penjualan</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Bayar
      </Typography>
      <Box sx={textFieldContainer}>
        <Box sx={textFieldWrapper}>
          <TextField
            id="outlined-basic"
            label="Nomor Nota"
            variant="outlined"
            value={nomorNota}
            onChange={(e) => setNomorNota(e.target.value)}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            id="outlined-basic"
            label="Tanggal"
            variant="outlined"
            sx={textFieldStyle}
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            id="outlined-basic"
            label="Total"
            variant="outlined"
            sx={textFieldStyle}
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            InputProps={{
              readOnly: true
            }}
          />
        </Box>
        <Box sx={textFieldBox}>
          <TextField
            id="outlined-basic"
            label="Non Tunai"
            variant="outlined"
            sx={textFieldResponsive}
            value={nonTunai === 0 ? "" : nonTunai}
            onChange={(e) => setNonTunai(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Tunai"
            variant="outlined"
            sx={textFieldStyle}
            value={tunai === 0 ? "" : tunai}
            onChange={(e) => setTunai(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Kembali"
            variant="outlined"
            sx={textFieldStyle}
            value={
              !isNaN(parseInt(nonTunai)) &&
              !isNaN(parseInt(tunai)) &&
              !isNaN(parseInt(total))
                ? parseInt(nonTunai) + parseInt(tunai) - parseInt(total)
                : ""
            }
            onChange={(e) => {
              setKembali(e.target.value);
            }}
          />
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

export default BayarPenjualanStok;

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

const textFieldBox = {
  display: "flex",
  flex: 1,
  flexDirection: "column"
};
