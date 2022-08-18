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
import EditIcon from "@mui/icons-material/Edit";

const UbahPembelianStok = () => {
  const [nomorNota, setNomorNota] = useState("");
  const [jenis, setJenis] = useState("");
  const [kodeSupplier, setKodeSupplier] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const jenisTransaksi = [{ label: "TUNAI" }, { label: "KREDIT" }];

  const supplierOptions = suppliers.map((supplier) => ({
    label: `${supplier.kodeSupplier} - ${supplier.namaSupplier}`
  }));

  useEffect(() => {
    getSupplier();
    getUserById();
  }, []);

  const getSupplier = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/suppliers`);
    setSuppliers(response.data);
    setLoading(false);
  };

  const getUserById = async () => {
    const response = await axios.get(`${tempUrl}/pembelianStoks/${id}`);
    setNomorNota(response.data.nomorNota);
    setTanggal(response.data.tanggal);
    setJenis(response.data.jenis);
    setKodeSupplier(response.data.kodeSupplier);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.patch(`${tempUrl}/pembelianStoks/${id}`, {
        nomorNota,
        tanggal,
        jenis,
        kodeSupplier
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
        Ubah Pembelian
      </Typography>
      <Divider sx={dividerStyle} />
      <Box sx={textFieldContainer}>
        <Box sx={textFieldWrapper}>
          <TextField
            id="outlined-basic"
            label="Nomor Nota"
            variant="outlined"
            value={nomorNota}
            onChange={(e) => setNomorNota(e.target.value)}
          />
          <TextField
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
              <TextField {...params} label="Jenis Transaksi" />
            )}
            defaultValue={{ label: jenis }}
            onInputChange={(e, value) => setJenis(value)}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={supplierOptions}
            renderInput={(params) => (
              <TextField {...params} label="Kode Groups" />
            )}
            onInputChange={(e, value) =>
              setKodeSupplier(value.split(" ", 1)[0])
            }
            defaultValue={{ label: kodeSupplier }}
            sx={textFieldStyle}
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

export default UbahPembelianStok;

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
