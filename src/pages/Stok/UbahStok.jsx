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
  Autocomplete,
  Card,
  CardActionArea,
  CardMedia,
  CardActions,
  IconButton
} from "@mui/material";
import Carousel from "react-elastic-carousel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { KeyOffRounded } from "@mui/icons-material";

const UbahStok = () => {
  let [arrayImage, setArrayImage] = useState([]);
  let [arrayImageUrl, setArrayImageUrl] = useState([]);
  let [deleteGambarId, setDeleteGambarId] = useState([]);
  let [deleteGambar, setDeleteGambar] = useState([]);
  let [gambar, setGambar] = useState(null);
  let [gambarId, setGambarId] = useState(null);
  const [kodeGroup, setKodeGroup] = useState("ACK");
  const [kodeStok, setKodeStok] = useState("");
  const [kodeBarcode, setKodeBarcode] = useState("");
  const [namaStok, setNama] = useState("");
  const [merk, setMerk] = useState("");
  const [satuanKecil, setSatuanKecil] = useState("");
  const [satuanBesar, setSatuanBesar] = useState("");
  const [konversi, setKonversi] = useState("");
  const [qty, setQty] = useState("");
  const [hargaJualKecil, setHargaJualKecil] = useState("");
  const [hargaJualBesar, setHargaJualBesar] = useState("");
  const [group, setGroup] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 }
  ];

  useEffect(() => {
    getUserById();
    getGroupStok();
    getUrlImg();
  }, [arrayImage]);

  const groupStokOptions = group.map((groupStok) => ({
    label: `${groupStok.kodeGroup} - ${groupStok.namaGroup}`
  }));

  const getUrlImg = () => {
    let tempArrayImageUrl = [];
    Object.keys(arrayImage).map(function (key, index) {
      tempArrayImageUrl.push(URL.createObjectURL(arrayImage[key]));
      setArrayImageUrl(tempArrayImageUrl);
    });
  };

  const hapusGambar = (img, i) => {
    setGambarId(
      gambarId.filter((val) => {
        if (val === gambarId[i] || gambarId.length === 1) {
          deleteGambarId.push(val);
        }
        return val !== gambarId[i];
      })
    );

    setGambar(
      gambar.filter((val) => {
        if (val === img || gambar.length === 1) {
          deleteGambar.push(val);
        }
        return val !== img;
      })
    );
  };

  const getUserById = async () => {
    if (id) {
      setLoading(true);
      const response = await axios.get(`${tempUrl}/stoks/${id}`);
      setGambarId(response.data.gambarId);
      setGambar(response.data.gambar);
      setKodeGroup(response.data.kodeGroup);
      setKodeStok(response.data.kodeStok);
      setKodeBarcode(response.data.kodeBarcode);
      setNama(response.data.namaStok);
      setMerk(response.data.merk);
      setSatuanKecil(response.data.satuanKecil);
      setSatuanBesar(response.data.satuanBesar);
      setKonversi(response.data.konversi);
      setQty(response.data.qty);
      setHargaJualKecil(response.data.hargaJualKecil);
      setHargaJualBesar(response.data.hargaJualBesar);
      setLoading(false);
    }
  };

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
            gambar.push(response.data.url);
            gambarId.push(response.data.public_id);
          })
          .catch((e) => {
            console.log(e);
          }));

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (let i = 0; i < arrayImage.length; i++) {
      formData.append("file", arrayImage[i]);
      formData.append("upload_preset", "pnwyctyw");
      await saveImage(formData);
    }

    try {
      setLoading(true);
      await axios.patch(`${tempUrl}/stoks/${id}`, {
        deleteGambar,
        deleteGambarId,
        gambarId: gambarId,
        gambar: gambar,
        kodeGroup,
        kodeStok,
        kodeBarcode,
        namaStok,
        merk,
        qty,
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
  };

  const getGroupStok = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/groupStoks`);
    setGroup(response.data);
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={container}>
      <Typography color="#757575">Master</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Ubah Stok
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
      <Divider sx={dividerStyle} />
      <Box sx={deleteButtonContainer}>
        <Typography variant="h6" sx={deleteButtonText}>
          Hapus Gambar
        </Typography>
      </Box>
      {gambar && gambarId.length !== 0 && (
        <Carousel breakPoints={breakPoints} sx={carouselStyle}>
          {gambar &&
            gambar.map((img, i) => (
              <Card sx={oldImageCard}>
                <CardActionArea disableRipple>
                  <CardMedia
                    component="img"
                    height="100%"
                    src={img}
                    alt={namaStok}
                    sx={oldImageCardMedia}
                  />
                </CardActionArea>
                <CardActions sx={oldImageCardAction}>
                  <IconButton aria-label="delete">
                    <DeleteIcon
                      color="error"
                      onClick={() => hapusGambar(img, i)}
                    />
                  </IconButton>
                </CardActions>
              </Card>
            ))}
        </Carousel>
      )}
      <Box sx={textFieldContainer}>
        <Box sx={textFieldWrapper}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={groupStokOptions}
            renderInput={(params) => (
              <TextField {...params} label="Kode Groups" />
            )}
            onInputChange={(e, value) => setKodeGroup(value.split(" ", 1)[0])}
            defaultValue={{ label: kodeGroup }}
          />
          <TextField
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
            id="outlined-basic"
            label="Nama"
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
          <TextField
            id="outlined-basic"
            label="Harga Jual Kecil"
            variant="outlined"
            sx={textFieldStyle}
            value={hargaJualKecil}
            onChange={(e) => setHargaJualKecil(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Harga Jual Besar"
            variant="outlined"
            sx={textFieldStyle}
            value={hargaJualBesar}
            onChange={(e) => setHargaJualBesar(e.target.value)}
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

export default UbahStok;

const container = {
  pt: 10
};

const subTitleText = {
  fontWeight: "900"
};

const dividerStyle = {
  mt: 2
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

const deleteButtonContainer = {
  display: "flex",
  justifyContent: "center",
  mt: 2
};

const deleteButtonText = {
  fontWeight: "300"
};

const carouselStyle = {
  display: "flex",
  height: "400px"
};

const oldImageCard = {
  m: "auto",
  mt: 2,
  width: "200px",
  height: "200px",
  display: "flex",
  flexDirection: "column"
};

const oldImageCardMedia = {
  display: "flex",
  maxHeight: "150px"
};

const oldImageCardAction = {
  display: "flex",
  justifyContent: "center",
  mt: "auto"
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
