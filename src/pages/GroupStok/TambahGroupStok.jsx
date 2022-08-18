import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { tempUrl } from "../../contexts/ContextProvider";
import { Loader } from "../../components";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const TambahGroupStok = () => {
  const [kodeGroup, setKodeGroup] = useState("");
  const [namaGroup, setNama] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`${tempUrl}/groupStoks`, {
        kodeGroup,
        namaGroup
      });
      setLoading(false);
      navigate("/groupStok");
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
        Tambah Group Stok
      </Typography>
      <Divider sx={dividerStyle} />
      <Box sx={showDataContainer}>
        <Box sx={showDataWrapper}>
          <TextField
            id="outlined-basic"
            label="Kode"
            variant="outlined"
            value={kodeGroup}
            onChange={(e) => setKodeGroup(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Nama Group Stok"
            variant="outlined"
            sx={spacingTop}
            value={namaGroup}
            onChange={(e) => setNama(e.target.value)}
          />
        </Box>
      </Box>
      <Box sx={spacingTop}>
        <Button variant="contained" startIcon={<SaveIcon />} onClick={saveUser}>
          Simpan
        </Button>
      </Box>
      <Divider sx={spacingTop} />
    </Box>
  );
};

export default TambahGroupStok;

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
  maxWidth: {
    md: "40vw"
  }
};

const spacingTop = {
  mt: 4
};
