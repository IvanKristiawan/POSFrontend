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
  Card,
  CardActionArea,
  CardMedia,
  Snackbar,
  Alert
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import SaveIcon from "@mui/icons-material/Save";
import { KeyOffRounded } from "@mui/icons-material";

const TambahStok = () => {
  const [open, setOpen] = useState(false);
  let [arrayImage, setArrayImage] = useState([]);
  let [arrayImageUrl, setArrayImageUrl] = useState([]);
  let [tempGambarId, setTempGambarId] = useState([]);
  let [tempGambar, setTempGambar] = useState([]);
  const [kodeGroup, setKodeGroup] = useState("");
  const [kodeStok, setKodeStok] = useState("");
  const [kodeBarcode, setKodeBarcode] = useState("");
  const [namaStok, setNama] = useState("");
  const [merk, setMerk] = useState("");
  const [satuanKecil, setSatuanKecil] = useState("");
  const [satuanBesar, setSatuanBesar] = useState("");
  const [konversi, setKonversi] = useState("");
  const [hargaJualKecil, setHargaJualKecil] = useState("");
  const [hargaJualBesar, setHargaJualBesar] = useState("");
  const [error, setError] = useState(false);
  const [group, setGroup] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    getGroupStok();
    getUrlImg();
  }, [arrayImage]);

  useEffect(() => {
    getKodeStokNext();
  }, [kodeGroup]);

  const getUrlImg = () => {
    let tempArrayImageUrl = [];
    Object.keys(arrayImage).map(function (key, index) {
      tempArrayImageUrl.push(URL.createObjectURL(arrayImage[key]));
      setArrayImageUrl(tempArrayImageUrl);
    });
  };

  const getKodeStokNext = async () => {
    if (kodeGroup && kodeGroup.length > 0) {
      const response = await axios.get(
        `${tempUrl}/stoks/kodeStokNextLength/${kodeGroup}`
      );
      setKodeStok(`${kodeGroup}-${response.data}`);
    } else {
      setKodeStok("");
    }
  };

  const getGroupStok = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/groupStoks`);
    setGroup(response.data);
    setLoading(false);
  };

  const groupStokOptions = group.map((groupStok) => ({
    label: `${groupStok.kodeGroup} - ${groupStok.namaGroup}`
  }));

  const saveImage = async (formData) => {
    try {
      setLoading(true);

      arrayImage &&
        (await axios
          .post(
            "https://api.cloudinary.com/v1_1/dbtag5lau/image/upload",
            formData
          )
          .then((response) => {
            tempGambar.push(response.data.url);
            tempGambarId.push(response.data.public_id);
          })
          .catch((e) => {
            console.log(e);
          }));

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const saveUser = async (e) => {
    e.preventDefault();

    if (
      kodeGroup.length === 0 ||
      kodeStok.length === 0 ||
      namaStok.length === 0 ||
      hargaJualKecil.length === 0 ||
      hargaJualBesar.length === 0
    ) {
      setError(true);
      setOpen(!open);
    } else {
      const formData = new FormData();

      for (let i = 0; i < arrayImage.length; i++) {
        formData.append("file", arrayImage[i]);
        formData.append("upload_preset", "pnwyctyw");
        await saveImage(formData);
      }
      setError(true);
      setOpen(!open);
      try {
        setLoading(true);
        await axios.post(`${tempUrl}/stoks`, {
          gambarId: tempGambarId,
          gambar: tempGambar,
          kodeGroup,
          kodeStok,
          kodeBarcode,
          namaStok,
          merk,
          satuanKecil,
          satuanBesar,
          konversi,
          hargaJualKecil,
          hargaJualBesar
        });
        setLoading(false);
        navigate("/stok");
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
        Tambah Stok
      </Typography>
      <Divider sx={dividerStyle} />
      <Box mt={2} textAlign="center" sx={imagePickerContainer}>
        <input
          accept="image/*"
          type="file"
          id="select-image"
          style={{ display: "none" }}
          onChange={(e) => setArrayImage(e.target.files)}
          multiple
        />
        <label htmlFor="select-image">
          <Button
            variant="contained"
            color="primary"
            component="span"
            endIcon={<FileUploadIcon />}
          >
            Unggah Gambar
          </Button>
        </label>
      </Box>
      <Box sx={listImageContainer}>
        {arrayImageUrl &&
          arrayImage &&
          arrayImageUrl.map((key, i) => (
            <Card sx={imageCard}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200px"
                  src={key}
                  alt={KeyOffRounded.name}
                />
              </CardActionArea>
            </Card>
          ))}
      </Box>
      <Box sx={textFieldContainer}>
        <Box sx={textFieldWrapper}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={groupStokOptions}
            renderInput={(params) => (
              <TextField
                error={error && kodeGroup.length === 0 && true}
                helperText={
                  error && kodeGroup.length === 0 && "Kode Group harus diisi!"
                }
                {...params}
                label="Kode Groups"
              />
            )}
            onInputChange={(e, value) => setKodeGroup(value.split(" ", 1)[0])}
          />
          <TextField
            error={error && kodeStok.length === 0 && true}
            helperText={
              error && kodeStok.length === 0 && "Kode Stok harus diisi!"
            }
            id="outlined-basic"
            label="Kode"
            variant="outlined"
            sx={textFieldStyle}
            value={kodeStok}
            onChange={(e) => setKodeStok(e.target.value)}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            id="outlined-basic"
            label="Barcode"
            variant="outlined"
            sx={textFieldStyle}
            value={kodeBarcode}
            onChange={(e) => setKodeBarcode(e.target.value)}
          />
          <TextField
            error={error && namaStok.length === 0 && true}
            helperText={
              error && namaStok.length === 0 && "Nama Stok harus diisi!"
            }
            id="outlined-basic"
            label="Nama Stok"
            variant="outlined"
            sx={textFieldStyle}
            value={namaStok}
            onChange={(e) => setNama(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Merk"
            variant="outlined"
            sx={textFieldStyle}
            value={merk}
            onChange={(e) => setMerk(e.target.value)}
          />
        </Box>
        <Box sx={textFieldBox}>
          <TextField
            id="outlined-basic"
            label="Satuan Kecil"
            variant="outlined"
            sx={textFieldResponsive}
            value={satuanKecil}
            onChange={(e) => setSatuanKecil(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Satuan Besar"
            variant="outlined"
            sx={textFieldStyle}
            value={satuanBesar}
            onChange={(e) => setSatuanBesar(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Konversi"
            variant="outlined"
            sx={textFieldStyle}
            value={konversi}
            onChange={(e) => setKonversi(e.target.value)}
          />
          <Box sx={hargaContainer}>
            <Typography sx={hargaText}>
              Harga Jual Kecil
              {hargaJualKecil !== 0 &&
                !isNaN(parseInt(hargaJualKecil)) &&
                ` : Rp ${parseInt(hargaJualKecil).toLocaleString()}`}
            </Typography>
            <TextField
              error={error && hargaJualKecil.length === 0 && true}
              helperText={
                error &&
                hargaJualKecil.length === 0 &&
                "Harga Jual Kecil Stok harus diisi!"
              }
              id="outlined-basic"
              variant="outlined"
              size="small"
              sx={hargaTextField}
              value={hargaJualKecil}
              onChange={(e) => setHargaJualKecil(e.target.value)}
            />
          </Box>
          <Box sx={hargaContainer}>
            <Typography sx={hargaText}>
              Harga Jual Besar
              {hargaJualKecil !== 0 &&
                !isNaN(parseInt(hargaJualBesar)) &&
                ` : Rp ${parseInt(hargaJualBesar).toLocaleString()}`}
            </Typography>
            <TextField
              error={error && hargaJualBesar.length === 0 && true}
              helperText={
                error &&
                hargaJualBesar.length === 0 &&
                "Harga Jual Besar Stok harus diisi!"
              }
              id="outlined-basic"
              variant="outlined"
              size="small"
              sx={hargaTextField}
              value={hargaJualBesar}
              onChange={(e) => setHargaJualBesar(e.target.value)}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={textFieldStyle}>
        <Button variant="contained" startIcon={<SaveIcon />} onClick={saveUser}>
          Simpan
        </Button>
      </Box>
      <Divider sx={{ mt: 2 }} />
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

export default TambahStok;

const container = {
  pt: 10
};

const subTitleText = {
  fontWeight: "900"
};

const dividerStyle = {
  mt: 2,
  mb: 2
};

const imagePickerContainer = {
  display: "flex",
  flexDirection: "column"
};

const listImageContainer = {
  display: "flex",
  flexWrap: "wrap"
};

const imageCard = {
  m: "auto",
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

const alertBox = {
  width: "100%"
};
