import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  ListItem,
  Divider
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { tempUrl } from "../contexts/ContextProvider";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import KeyIcon from "@mui/icons-material/Key";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BallotIcon from "@mui/icons-material/Ballot";
import DnsIcon from "@mui/icons-material/Dns";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import ListAltIcon from "@mui/icons-material/ListAlt";

function SidebarMenu() {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const [openUtility, setOpenUtility] = React.useState(false);
  const [openMaster, setOpenMaster] = React.useState(false);
  const [openTransaksi, setOpenTransaksi] = React.useState(false);

  const handleClickUtility = () => {
    setOpenUtility(!openUtility);
  };

  const handleClickMaster = () => {
    setOpenMaster(!openMaster);
  };

  const handleClickTransaksi = () => {
    setOpenTransaksi(!openTransaksi);
  };

  const newPenjualanStokKSR = async () => {
    if (user && user.tipeUser === "KSR") {
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

  return (
    <ListItem key={"Test"} disablePadding sx={container}>
      {/* Utility Button */}
      <ListItemButton onClick={handleClickUtility}>
        <ListItemIcon>
          <LockIcon />
        </ListItemIcon>
        <ListItemText primary="Utility" />
        {openUtility ? (
          <ExpandLess color="primary" />
        ) : (
          <ExpandMore color="primary" />
        )}
      </ListItemButton>
      <Collapse in={openUtility} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/profilUser" style={linkText}>
            <ListItemButton sx={listItemButtonStyle}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Profil User" />
            </ListItemButton>
          </Link>
          {user && user.tipeUser === "SPV" && (
            <Link to="/user" style={linkText}>
              <ListItemButton sx={listItemButtonStyle}>
                <ListItemIcon>
                  <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="Daftar User" />
              </ListItemButton>
            </Link>
          )}
        </List>
      </Collapse>

      <Divider />
      {/* Master Button */}
      {user && user.tipeUser === "SPV" && (
        <>
          <ListItemButton onClick={handleClickMaster}>
            <ListItemIcon>
              <KeyIcon />
            </ListItemIcon>
            <ListItemText primary="Master" />
            {openMaster ? (
              <ExpandLess color="primary" />
            ) : (
              <ExpandMore color="primary" />
            )}
          </ListItemButton>
          <Collapse in={openMaster} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/supplier" style={linkText}>
                <ListItemButton sx={listItemButtonStyle}>
                  <ListItemIcon>
                    <AssignmentIcon />
                  </ListItemIcon>
                  <ListItemText primary="Supplier" />
                </ListItemButton>
              </Link>
              <Link to="/groupStok" style={linkText}>
                <ListItemButton sx={listItemButtonStyle}>
                  <ListItemIcon>
                    <BallotIcon />
                  </ListItemIcon>
                  <ListItemText primary="Group Stok" />
                </ListItemButton>
              </Link>
              <Link to="/stok" style={linkText}>
                <ListItemButton sx={listItemButtonStyle}>
                  <ListItemIcon>
                    <DnsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Stok" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>
        </>
      )}

      <Divider />

      {/* Transaksi Button */}
      <ListItemButton onClick={handleClickTransaksi}>
        <ListItemIcon>
          <ReceiptLongIcon />
        </ListItemIcon>
        <ListItemText primary="Transaksi" />
        {openTransaksi ? (
          <ExpandLess color="primary" />
        ) : (
          <ExpandMore color="primary" />
        )}
      </ListItemButton>
      <Collapse in={openTransaksi} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {user && user.tipeUser === "SPV" && (
            <Link to="/daftarPembelianStok" style={linkText}>
              <ListItemButton sx={listItemButtonStyle}>
                <ListItemIcon>
                  <LocalMallIcon />
                </ListItemIcon>
                <ListItemText primary="Pembelian Stok" />
              </ListItemButton>
            </Link>
          )}
          {user && user.tipeUser === "KSR" ? (
            <Link to="/" style={linkText} onClick={() => newPenjualanStokKSR()}>
              <ListItemButton sx={listItemButtonStyle}>
                <ListItemIcon>
                  <PointOfSaleIcon />
                </ListItemIcon>
                <ListItemText primary="Penjualan Stok" />
              </ListItemButton>
            </Link>
          ) : (
            <Link to="/daftarPenjualanStok" style={linkText}>
              <ListItemButton sx={listItemButtonStyle}>
                <ListItemIcon>
                  <PointOfSaleIcon />
                </ListItemIcon>
                <ListItemText primary="Penjualan Stok" />
              </ListItemButton>
            </Link>
          )}
        </List>
      </Collapse>
    </ListItem>
  );
}

export default SidebarMenu;

const container = {
  display: "block"
};

const linkText = {
  textDecoration: "none",
  color: "inherit"
};

const listItemButtonStyle = {
  pl: 4
};
