import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, TextField, Typography, Divider, Pagination } from "@mui/material";
import { ShowTablePembelianStok } from "../../components/ShowTable";
import { Loader, usePagination, ButtonModifier } from "../../components";
import { tempUrl } from "../../contexts/ContextProvider";
import { useStateContext } from "../../contexts/ContextProvider";

const TampilPembelianStok = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const { screenSize } = useStateContext();
  const [nomorNota, setNomorNota] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [jenis, setJenis] = useState("");
  const [kodeSupplier, setKodeSupplier] = useState("");
  const [total, setTotal] = useState("");
  const [aPembelianStoks, setAPembelianStok] = useState([]);
  const [stoks, setStoks] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  let [page, setPage] = useState(1);
  const PER_PAGE = 20;

  // Get current posts
  const indexOfLastPost = page * PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - PER_PAGE;
  const currentPosts = aPembelianStoks.slice(indexOfFirstPost, indexOfLastPost);

  const count = Math.ceil(aPembelianStoks.length / PER_PAGE);
  const _DATA = usePagination(aPembelianStoks, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  useEffect(() => {
    getSupplier();
    getStoks();
    getAPembelianStoks();
    id && getUserById();
  }, [id]);

  const getSupplier = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/supplierMainInfo`);
    setSuppliers(response.data);
  };

  const getStoks = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/stokForTransaction`);
    setStoks(response.data);
    setLoading(false);
  };

  const getAPembelianStoks = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/aPembelianStoks`);
    setAPembelianStok(response.data);
  };

  const getUserById = async () => {
    if (id) {
      const response = await axios.get(`${tempUrl}/pembelianStoks/${id}`);
      setNomorNota(response.data.nomorNota);
      setTanggal(response.data.tanggal);
      setJenis(response.data.jenis);
      setKodeSupplier(response.data.kodeSupplier);
      setTotal(response.data.total);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      for (let aPembelianStok of aPembelianStoks) {
        for (let stok of stoks) {
          if (
            aPembelianStok.kodeStok === stok.kode &&
            aPembelianStok.nomorNota === nomorNota
          ) {
            let newQty = stok.qty - aPembelianStok.qty;
            await axios.patch(`${tempUrl}/stoks/${stok._id}`, {
              qty: newQty
            });
            await axios.delete(
              `${tempUrl}/aPembelianStoks/${aPembelianStok._id}`
            );
          }
        }
      }
      await axios.delete(`${tempUrl}/pembelianStoks/${id}`);
      setLoading(false);
      navigate("/daftarPembelianStok");
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
        Pembelian Stok
      </Typography>
      <Box sx={buttonModifierContainer}>
        <ButtonModifier
          id={id}
          kode={"test"}
          addLink={`/daftarPembelianStok/pembelianStok/${id}/tambahAPembelianStok`}
          editLink={`/daftarPembelianStok/pembelianStok/${id}/edit`}
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
            label="Jenis"
            variant="filled"
            sx={textFieldStyle}
            InputProps={{
              readOnly: true
            }}
            value={jenis}
          />
          <TextField
            id="outlined-basic"
            label="Kode Supplier"
            variant="filled"
            sx={textFieldStyle}
            InputProps={{
              readOnly: true
            }}
            value={`${kodeSupplier} - ${suppliers
              .filter((supplier) => supplier.kodeSupplier === kodeSupplier)
              .map((sup) => ` ${sup.namaSupplier}`)}`}
          />
          <TextField
            id="outlined-basic"
            label="Total"
            variant="filled"
            sx={textFieldStyle}
            InputProps={{
              readOnly: true
            }}
            value={total.toLocaleString()}
          />
        </Box>
      </Box>
      <Divider sx={dividerStyle} />
      <Box sx={tableContainer}>
        <ShowTablePembelianStok
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

export default TampilPembelianStok;

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
  maxWidth: {
    md: "40vw"
  }
};

const textFieldStyle = {
  display: "flex",
  mt: 4
};

const tableContainer = {
  pt: 4,
  display: "flex",
  justifyContent: "center"
};
