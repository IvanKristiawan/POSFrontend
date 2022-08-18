import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import {
  Box,
  Drawer,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Tooltip
} from "@mui/material";
import { useStateContext } from "./contexts/ContextProvider";
import { SidebarMenu, ProfileUser, Footer } from "./components";
import {
  TampilSupplier,
  TambahSupplier,
  UbahSupplier,
  TampilGroupStok,
  TambahGroupStok,
  UbahGroupStok,
  TampilStok,
  TambahStok,
  UbahStok,
  TampilDaftarPembelianStok,
  TambahPembelianStok,
  TampilPembelianStok,
  UbahPembelianStok,
  TambahAPembelianStok,
  TampilAPembelianStok,
  TampilDaftarPenjualanStok,
  TambahPenjualanStok,
  TampilPenjualanStok,
  BayarPenjualanStok,
  TambahAPenjualanStok,
  TampilAPenjualanStok
} from "./pages/index";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    })
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end"
}));

export default function App() {
  const { screenSize, setScreenSize } = useStateContext();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [screenSize]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <BrowserRouter>
        <CssBaseline />
        <AppBar position="fixed" open={open} sx={{ bgcolor: "primary.main" }}>
          <Toolbar>
            <Tooltip title="Menu">
              <IconButton
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ color: "white", mr: 2, ...(open && { display: "none" }) }}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
            <ProfileUser />
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box"
            }
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            {theme.direction === "ltr" ? (
              <>
                <Box sx={{ display: "flex", mr: "auto" }}>
                  <GpsFixedIcon sx={{ my: "auto" }} />
                  <Typography
                    variant="h6"
                    sx={{ my: "auto", ml: 2, fontWeight: "bold" }}
                  >
                    POS
                  </Typography>
                </Box>
                <IconButton onClick={handleDrawerClose}>
                  <ChevronLeftIcon color="primary" />
                </IconButton>
              </>
            ) : (
              <ChevronRightIcon />
            )}
          </DrawerHeader>
          <Divider />
          <List>
            <SidebarMenu />
          </List>
        </Drawer>
        <Main open={open} sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}>
          <Routes>
            <Route path="/" />
            {/* Master */}
            {/* Supplier */}
            <Route path="/supplier" element={<TampilSupplier />} />
            <Route
              path="/supplier/tambahSupplier"
              element={<TambahSupplier />}
            />
            <Route path="/supplier/:id" element={<TampilSupplier />} />
            <Route path="/supplier/:id/edit" element={<UbahSupplier />} />
            {/* Group Stok */}
            <Route path="/groupStok" element={<TampilGroupStok />} />
            <Route
              path="/groupStok/tambahGroupStok"
              element={<TambahGroupStok />}
            />
            <Route path="/groupStok/:id" element={<TampilGroupStok />} />
            <Route path="/groupStok/:id/edit" element={<UbahGroupStok />} />
            {/* Stok */}
            <Route path="/stok" element={<TampilStok />} />
            <Route path="/stok/:id" element={<TampilStok />} />
            <Route path="/stok/:id/edit" element={<UbahStok />} />
            <Route path="/stok/tambahStok" element={<TambahStok />} />
            {/* Pembelian Stok */}
            <Route
              path="/daftarPembelianStok"
              element={<TampilDaftarPembelianStok />}
            />
            <Route
              path="/daftarPembelianStok/pembelianStok/tambahPembelianStok"
              element={<TambahPembelianStok />}
            />
            <Route
              path="/daftarPembelianStok/pembelianStok/:id"
              element={<TampilPembelianStok />}
            />
            <Route
              path="/daftarPembelianStok/pembelianStok/:id/edit"
              element={<UbahPembelianStok />}
            />
            {/* A Pembelian Stok */}
            <Route
              path="/daftarPembelianStok/pembelianStok/:id/tambahAPembelianStok"
              element={<TambahAPembelianStok />}
            />
            <Route
              path="/daftarPembelianStok/pembelianStok/:id/:idAPembelianStok"
              element={<TampilAPembelianStok />}
            />
            {/* Penjualan Stok */}
            <Route
              path="/daftarPenjualanStok"
              element={<TampilDaftarPenjualanStok />}
            />
            <Route
              path="/daftarPenjualanStok/penjualanStok/tambahPenjualanStok"
              element={<TambahPenjualanStok />}
            />
            <Route
              path="/daftarPenjualanStok/penjualanStok/:id"
              element={<TampilPenjualanStok />}
            />
            <Route
              path="/daftarPenjualanStok/penjualanStok/:id/bayar"
              element={<BayarPenjualanStok />}
            />
            {/* A Penjualan Stok */}
            <Route
              path="/daftarPenjualanStok/penjualanStok/:id/tambahAPenjualanStok"
              element={<TambahAPenjualanStok />}
            />
            <Route
              path="/daftarPenjualanStok/penjualanStok/:id/:idAPenjualanStok"
              element={<TampilAPenjualanStok />}
            />
          </Routes>
          <Footer />
        </Main>
      </BrowserRouter>
    </Box>
  );
}
