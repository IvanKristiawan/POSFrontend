import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { tempUrl } from "../../contexts/ContextProvider";
import { Loader } from "../../components";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const UbahSupplier = () => {
  const [kodeSupplier, setKodeSupplier] = useState("");
  const [namaSupplier, setNama] = useState("");
  const [alamatSupplier, setAlamat] = useState("");
  const [kota, setKota] = useState("");
  const [telp, setTelp] = useState("");
  const [npwp, setNpwp] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/suppliers/${id}`);
    setKodeSupplier(response.data.kodeSupplier);
    setNama(response.data.namaSupplier);
    setAlamat(response.data.alamatSupplier);
    setKota(response.data.kota);
    setTelp(response.data.telp);
    setNpwp(response.data.npwp);
    setLoading(false);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.patch(`${tempUrl}/suppliers/${id}`, {
        kodeSupplier,
        namaSupplier,
        alamatSupplier,
        kota,
        telp,
        npwp
      });
      setLoading(false);
      navigate(`/supplier/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={container}>
      <Typography color="#757575">Master</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Ubah Supplier
      </Typography>
      <Divider sx={dividerStyle} />
      <Box sx={showDataContainer}>
        <Box sx={showDataWrapper}>
          <TextField
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
        <Box sx={textFieldBox}>
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

export default UbahSupplier;

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

const textFieldBox = {
  display: "flex",
  flex: 1,
  flexDirection: "column"
};
