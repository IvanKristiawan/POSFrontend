import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, TextField, Typography, Divider, Button } from "@mui/material";
import { Loader } from "../../components";
import { tempUrl } from "../../contexts/ContextProvider";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import jsPDF from "jspdf";

const BayarPenjualanStok = () => {
  const { user, dispatch } = useContext(AuthContext);
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
      downloadPdf(nomorNota, nonTunai, tunai);
      setLoading(false);
      newPenjualanStokKSR();
    } catch (error) {
      console.log(error);
    }
  };

  const newPenjualanStokKSR = async () => {
    if (user) {
      const today = new Date();
      const date =
        ("0" + today.getDate()).slice(-2) +
        "-" +
        ("0" + (today.getMonth() + 1)).slice(-2) +
        "-" +
        today.getFullYear();
      try {
        const nextPenjualanStok = await axios.get(
          `${tempUrl}/penjualanStoksCount`
        );
        const response = await axios.post(`${tempUrl}/penjualanStoks`, {
          nomorNota: nextPenjualanStok.data,
          tanggal: date
        });
        navigate(`/daftarPenjualanStok/penjualanStok/${response.data._id}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const downloadPdf = async (nomorNota, nonTunai, tunai) => {
    const response = await axios.get(
      `${tempUrl}/aPenjualanStokByNomorNota/${nomorNota}`
    );
    const today = new Date();
    const now = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Jakarta"
    });
    const date =
      ("0" + today.getDate()).slice(-2) +
      "-" +
      ("0" + (today.getMonth() + 1)).slice(-2) +
      "-" +
      today.getFullYear();
    const current = now.split(" ")[1] + " " + now.split(" ")[2];
    let y = 8;
    const doc = new jsPDF();
    doc.setFontSize(8);
    doc.setDrawColor(101, 101, 101);
    doc.text(`${date} ${current}`, 6, y);
    y += 5;
    doc.text(`${nomorNota}/${user.kodeNota}`, 6, y);
    y += 2;
    doc.text(`----------------------------------------------`, 6, y);
    doc.setFontSize(6);
    for (let i = 0; i < response.data.length; i++) {
      y += 3;
      doc.text(`${response.data[i].namaStok}`, 6, y);
      y += 2;
      doc.text(
        `           ${response.data[
          i
        ].qty.toLocaleString()}x           ${response.data[
          i
        ].hargaSatuan.toLocaleString()}           ${response.data[
          i
        ].total.toLocaleString()}`,
        6,
        y
      );
    }
    y += 2;
    doc.text(
      `-------------------------------------------------------------`,
      6,
      y
    );
    y += 3;
    doc.text(
      `SubTotal           Rp.               ${total.toLocaleString()}`,
      6,
      y
    );
    y += 3;
    doc.text(
      `NonTunai          Rp.               ${parseInt(
        nonTunai
      ).toLocaleString()}`,
      6,
      y
    );
    y += 3;
    doc.text(
      `Cash/Tunai       Rp.               ${parseInt(tunai).toLocaleString()}`,
      6,
      y
    );
    y += 3;
    doc.text(
      `Kembali            Rp.               ${(!isNaN(
        parseInt(nonTunai) + parseInt(tunai) - parseInt(total)
      )
        ? parseInt(nonTunai) + parseInt(tunai) - parseInt(total)
        : 0
      ).toLocaleString()}`,
      6,
      y
    );
    y += 3;
    doc.text(`${response.data.length} ITEM`, 10, y);
    y += 5;
    doc.text(`BARANG YANG SUDAH DIBELI`, 11, y);
    y += 3;
    doc.text(`TIDAK BISA DIKEMBALIKAN`, 12, y);

    doc.autoPrint({ variant: "non-conform" });
    doc.save(`nota-${nomorNota}.pdf`);
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
          <Box sx={hargaContainer}>
            <Typography sx={{ fontWeight: "600" }}>
              Total :
              {total !== 0 &&
                !isNaN(parseInt(total)) &&
                ` Rp ${parseInt(total).toLocaleString()}`}
            </Typography>
          </Box>
        </Box>
        <Box sx={textFieldBox}>
          <Box sx={textFieldResponsive}>
            <Typography sx={hargaText}>
              Non Tunai :
              {nonTunai !== 0 &&
                !isNaN(parseInt(nonTunai)) &&
                ` Rp ${parseInt(nonTunai).toLocaleString()}`}
            </Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              sx={hargaTextField}
              value={nonTunai === 0 ? "" : nonTunai}
              onChange={(e) => setNonTunai(e.target.value)}
            />
          </Box>
          <Box sx={hargaContainer}>
            <Typography sx={hargaText}>
              Tunai :
              {tunai !== 0 &&
                !isNaN(parseInt(tunai)) &&
                ` Rp ${parseInt(tunai).toLocaleString()}`}
            </Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              sx={hargaTextField}
              value={tunai === 0 ? "" : tunai}
              onChange={(e) => setTunai(e.target.value)}
            />
          </Box>
          <Box sx={{ marginTop: 4 }}>
            <Typography sx={{ fontWeight: "600" }}>
              Kembali :
              {total !== 0 &&
                !isNaN(
                  parseInt(nonTunai) + parseInt(tunai) - parseInt(total)
                ) &&
                ` Rp ${(
                  parseInt(nonTunai) +
                  parseInt(tunai) -
                  parseInt(total)
                ).toLocaleString()}`}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={textFieldStyle}>
        <Button
          variant="contained"
          startIcon={<PointOfSaleIcon />}
          onClick={saveUser}
        >
          Bayar
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
    sm: -2
  }
};

const textFieldBox = {
  display: "flex",
  flex: 1,
  flexDirection: "column"
};

const hargaContainer = {
  marginTop: 3
};

const hargaText = {
  fontWeight: "500",
  color: "gray"
};

const hargaTextField = {
  display: "flex"
};
