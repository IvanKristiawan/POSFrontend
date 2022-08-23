import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  TextField,
  Typography,
  Divider,
  Pagination,
  Button
} from "@mui/material";
import { ShowTablePenjualanStok } from "../../components/ShowTable";
import { Loader, usePagination, ButtonModifier } from "../../components";
import { tempUrl } from "../../contexts/ContextProvider";
import { useStateContext } from "../../contexts/ContextProvider";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";

const TampilPenjualanStok = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const { screenSize } = useStateContext();
  const [nomorNota, setNomorNota] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [total, setTotal] = useState("");
  const [nonTunai, setNonTunai] = useState("");
  const [tunai, setTunai] = useState("");
  const [kembali, setKembali] = useState("");
  const [aPenjualanStoks, setAPenjualanStok] = useState([]);
  const [stoks, setStoks] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  let [page, setPage] = useState(1);
  const PER_PAGE = 20;

  // Get current posts
  const indexOfLastPost = page * PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - PER_PAGE;
  const currentPosts = aPenjualanStoks.slice(indexOfFirstPost, indexOfLastPost);

  const count = Math.ceil(aPenjualanStoks.length / PER_PAGE);
  const _DATA = usePagination(aPenjualanStoks, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  useEffect(() => {
    getStoks();
    getAPenjualanStoks();
    id && getUserById();
  }, [id]);

  const getStoks = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/stokForTransaction`);
    setStoks(response.data);
    setLoading(false);
  };

  const getAPenjualanStoks = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/aPenjualanStoks`);
    setAPenjualanStok(response.data);
  };

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

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      for (let aPenjualanStok of aPenjualanStoks) {
        for (let stok of stoks) {
          if (
            aPenjualanStok.kodeStok === stok.kodeStok &&
            aPenjualanStok.nomorNota === nomorNota
          ) {
            let newQty = stok.qty + aPenjualanStok.qty;
            await axios.patch(`${tempUrl}/stoks/${stok._id}`, {
              qty: newQty
            });
            await axios.delete(
              `${tempUrl}/aPenjualanStoks/${aPenjualanStok._id}`
            );
          }
        }
      }
      await axios.delete(`${tempUrl}/penjualanStoks/${id}`);
      setLoading(false);
      navigate("/");
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
        Penjualan Stok
      </Typography>
      <Box sx={buttonModifierContainer}>
        <Button
          color="primary"
          variant="contained"
          startIcon={<PointOfSaleIcon />}
          sx={bayarButton}
          onClick={() => {
            navigate(`/daftarPenjualanStok/penjualanStok/${id}/bayar`);
          }}
        >
          Bayar
        </Button>
      </Box>
      <Box sx={buttonModifierContainer}>
        <ButtonModifier
          id={id}
          kode={"test"}
          addLink={`/daftarPenjualanStok/penjualanStok/${id}/tambahAPenjualanStok`}
          deleteUser={deleteUser}
        />
      </Box>
      <Divider sx={dividerStyle} />
      <Box sx={textFieldContainer}>
        <Box sx={textFieldWrapper}>
          <TextField
            id="outlined-basic"
            label="Nomor Nota"
            variant="filled"
            sx={textFieldStyle}
            InputProps={{
              readOnly: true
            }}
            value={nomorNota}
          />
          <TextField
            id="outlined-basic"
            label="Tanggal"
            variant="filled"
            sx={textFieldStyle}
            InputProps={{
              readOnly: true
            }}
            value={tanggal}
          />
          <TextField
            id="outlined-basic"
            label="Total"
            variant="filled"
            sx={textFieldStyle}
            InputProps={{
              readOnly: true
            }}
            value={total && total.toLocaleString()}
          />
        </Box>
        <Box sx={textFieldBox}>
          <TextField
            id="outlined-basic"
            label="Non Tunai"
            variant="filled"
            sx={textFieldStyle}
            InputProps={{
              readOnly: true
            }}
            value={nonTunai && nonTunai.toLocaleString()}
          />
          <TextField
            id="outlined-basic"
            label="Tunai"
            variant="filled"
            sx={textFieldStyle}
            InputProps={{
              readOnly: true
            }}
            value={tunai && tunai.toLocaleString()}
          />
          <TextField
            id="outlined-basic"
            label="Kembali"
            variant="filled"
            sx={textFieldStyle}
            InputProps={{
              readOnly: true
            }}
            value={kembali && kembali.toLocaleString()}
          />
        </Box>
      </Box>
      <Divider sx={dividerStyle} />
      <Box sx={tableContainer}>
        <ShowTablePenjualanStok
          id={id}
          currentPosts={currentPosts}
          stoks={stoks}
          nomorNota={nomorNota}
        />
      </Box>
      <Box sx={tableContainer}>
        <Pagination
          count={count}
          page={page}
          onChange={handleChange}
          color="primary"
          size={screenSize <= 600 ? "small" : "large"}
        />
      </Box>
    </Box>
  );
};

export default TampilPenjualanStok;

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
  mr: {
    xs: 0,
    sm: 10
  }
};

const textFieldStyle = {
  display: "flex",
  mt: 4
};

const textFieldBox = {
  display: "flex",
  flex: 1,
  flexDirection: "column"
};

const tableContainer = {
  pt: 4,
  display: "flex",
  justifyContent: "center"
};

const bayarButton = {
  textTransform: "none"
};
