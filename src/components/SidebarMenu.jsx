import * as React from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  ListItem,
  Divider
} from "@mui/material";
import { Link } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import KeyIcon from "@mui/icons-material/Key";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BallotIcon from "@mui/icons-material/Ballot";
import DnsIcon from "@mui/icons-material/Dns";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import SellIcon from "@mui/icons-material/Sell";
import EqualizerIcon from "@mui/icons-material/Equalizer";

function SidebarMenu() {
  const [openMaster, setOpenMaster] = React.useState(false);
  const [openTransaksi, setOpenTransaksi] = React.useState(false);

  const handleClickMaster = () => {
    setOpenMaster(!openMaster);
  };

  const handleClickTransaksi = () => {
    setOpenTransaksi(!openTransaksi);
  };

  return (
    <ListItem key={"Test"} disablePadding sx={{ display: "block" }}>
      {/* Performa Button */}
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <ListItemButton>
          <ListItemIcon>
            <EqualizerIcon />
          </ListItemIcon>
          <ListItemText primary="Performa" />
        </ListItemButton>
      </Link>
      <Divider />
      {/* Master Button */}
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
          <Link
            to="/supplier"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Supplier" />
            </ListItemButton>
          </Link>
          <Link
            to="/groupStok"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <BallotIcon />
              </ListItemIcon>
              <ListItemText primary="Group Stok" />
            </ListItemButton>
          </Link>
          <Link to="/stok" style={{ textDecoration: "none", color: "inherit" }}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <DnsIcon />
              </ListItemIcon>
              <ListItemText primary="Stok" />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>

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
          <Link
            to="/daftarPembelianStok"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <LocalMallIcon />
              </ListItemIcon>
              <ListItemText primary="Pembelian Stok" />
            </ListItemButton>
          </Link>
          <Link
            to="/daftarPenjualanStok"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <SellIcon />
              </ListItemIcon>
              <ListItemText primary="Penjualan Stok" />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>
    </ListItem>
  );
}

export default SidebarMenu;
