import React, { useState } from "react";
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
  Snackbar,
  Alert
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import jsPDF from "jspdf";

const LaporanKlerekan = () => {
  const today = new Date();
  const date =
    ("0" + today.getDate()).slice(-2) +
    "-" +
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "-" +
    today.getFullYear();
  const [open, setOpen] = useState(false);
  const [tanggal, setTanggal] = useState(date);
  const [kasir, setKasir] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const findKlerekan = async (e) => {
    e.preventDefault();
    let modalAwal = 0;
    let totalNonTunai = 0;
    let totalTunai = 0;
    let totalKembali = 0;
    if (tanggal.length === 0 || kasir.length === 0) {
      setError(true);
      setOpen(!open);
    } else {
      try {
        const response = await axios.post(
          `${tempUrl}/penjualanStokForKlerekan`,
          {
            tanggal,
            username: kasir
          }
        );
        response.data.map((val) => {
          totalNonTunai += val.nonTunai;
          totalTunai += val.tunai;
          totalKembali += val.kembali;
        });
        downloadPdf(modalAwal, totalNonTunai, totalTunai, totalKembali);
        navigate(`/`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const downloadPdf = async (
    modalAwal,
    totalNonTunai,
    totalTunai,
    totalKembali
  ) => {
    let y = 8;
    const doc = new jsPDF();
    doc.setFontSize(8);
    doc.setDrawColor(101, 101, 101);
    doc.text(`LOKARIA BES`, 6, y);
    doc.setFontSize(6);
    y += 5;
    doc.text(`Jl Bakti, Bukit Senang, TG. BALAI KARIMUN`, 6, y);
    y += 2;
    doc.text(
      `------------------------------------------------------------`,
      6,
      y
    );
    doc.setFontSize(8);
    y += 3;
    doc.text(`REKAP PENJUALAN KASIR`, 6, y);
    doc.setFontSize(6);
    y += 3;
    doc.text(`Tanggal         : ${tanggal}`, 6, y);
    y += 3;
    doc.text(`Kasir / Shift   : ${kasir} / 1`, 6, y);
    y += 2;
    doc.line(6, y, 48, y);
    y += 3;
    doc.text(`JUMLAH`, 34, y);
    y += 2;
    doc.line(28, y, 48, y);
    y += 3;
    doc.text(`KETERANGAN`, 10, y);
    doc.text(`OMSET`, 30, y);
    doc.text(`NOTA`, 40, y);
    doc.setFontSize(5);
    y += 2;
    doc.line(6, y, 48, y);
    doc.setFont(undefined, "bold");
    y += 3;
    doc.text(`MODAL :`, 7, y);
    doc.setFont(undefined, "normal");
    y += 2;
    doc.line(6, y, 48, y);
    y += 3;
    doc.text(`A - MODAL AWAL`, 7, y);
    doc.text(`${modalAwal}`, 30, y);
    y += 2;
    doc.line(6, y, 48, y);
    y += 3;
    doc.text(`${modalAwal}`, 30, y);
    doc.text(`0`, 40, y);
    doc.setFont(undefined, "bold");
    y += 3;
    doc.text(`PENJUALAN :`, 7, y);
    doc.setFont(undefined, "normal");
    y += 2;
    doc.line(6, y, 48, y);
    y += 3;
    doc.text(`Non Tunai :`, 7, y);
    doc.text(`${totalNonTunai.toLocaleString()}`, 30, y);
    doc.text(`0`, 40, y);
    y += 2;
    doc.line(6, y, 48, y);
    y += 3;
    doc.text(`Tunai :`, 7, y);
    doc.text(`${(totalTunai - totalKembali).toLocaleString()}`, 30, y);
    doc.text(`0`, 40, y);
    y += 2;
    doc.line(6, y, 48, y);
    doc.setFont(undefined, "bold");
    y += 3;
    doc.text(`Total Tunai :`, 7, y);
    doc.text(
      `${(modalAwal + totalTunai - totalKembali).toLocaleString()}`,
      30,
      y
    );
    doc.text(`0`, 40, y);
    y += 2;
    doc.line(6, y, 48, y);

    // Vertical Line
    doc.line(6, 26, 6, y);
    doc.line(28, 26, 28, 36);
    doc.line(39, 31, 39, 36);
    doc.line(48, 26, 48, y);
    // doc.line(200, 35, 200, y);
    // doc.line(148, 35, 148, y);

    doc.autoPrint({ variant: "non-conform" });
    doc.save(`laporanKlerekan-${tanggal}-${kasir}.pdf`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={container}>
      <Typography color="#757575">Laporan</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Laporan Klerekan
      </Typography>
      <Divider sx={dividerStyle} />
      <Box sx={showDataContainer}>
        <Box sx={showDataWrapper}>
          <TextField
            error={error && tanggal.length === 0 && true}
            helperText={error && tanggal.length === 0 && "Tanggal harus diisi!"}
            id="outlined-basic"
            label="Tanggal"
            variant="outlined"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
          />
          <TextField
            error={error && kasir.length === 0 && true}
            helperText={error && kasir.length === 0 && "Kasir harus diisi!"}
            id="outlined-basic"
            label="Kasir"
            variant="outlined"
            sx={spacingTop}
            value={kasir}
            onChange={(e) => setKasir(e.target.value)}
          />
        </Box>
      </Box>
      <Box sx={spacingTop}>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={findKlerekan}
        >
          Cari
        </Button>
      </Box>
      <Divider sx={spacingTop} />
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

export default LaporanKlerekan;

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

const alertBox = {
  width: "100%"
};
