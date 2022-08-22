import React, { useEffect, useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
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
  TampilPenjualanStok,
  BayarPenjualanStok,
  TambahAPenjualanStok,
  TampilAPenjualanStok,
  UbahAPenjualanStok,
  Login,
  Signup,
  User,
  UbahUser,
  ProfilUser,
  UbahProfilUser,
  ProtectedRoute
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

  const SPVRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (user && user.tipeUser === "SPV") {
      return children;
    }

    return <Navigate to="/unauthorized" />;
  };

  const KSRRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (user && (user.tipeUser === "KSR" || user.tipeUser === "SPV")) {
      return children;
    }

    return <Navigate to="/unauthorized" />;
  };

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
    <Box sx={container}>
      <BrowserRouter>
        <CssBaseline />
        <AppBar position="fixed" open={open} sx={appBarContainer}>
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
                <Box sx={brandIconContainer}>
                  <GpsFixedIcon sx={brandIcon} />
                  <Typography variant="h6" sx={brandIconText}>
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
        <Main open={open} sx={mainContainer}>
          <Routes>
            <Route path="/" />
            {/* Master */}
            {/* Supplier */}
            <Route
              path="/supplier"
              element={
                <SPVRoute>
                  <TampilSupplier />
                </SPVRoute>
              }
            />
            <Route
              path="/supplier/tambahSupplier"
              element={
                <SPVRoute>
                  <TambahSupplier />
                </SPVRoute>
              }
            />
            <Route
              path="/supplier/:id"
              element={
                <SPVRoute>
                  <TampilSupplier />
                </SPVRoute>
              }
            />
            <Route
              path="/supplier/:id/edit"
              element={
                <SPVRoute>
                  <UbahSupplier />
                </SPVRoute>
              }
            />
            {/* Group Stok */}
            <Route
              path="/groupStok"
              element={
                <SPVRoute>
                  <TampilGroupStok />
                </SPVRoute>
              }
            />
            <Route
              path="/groupStok/tambahGroupStok"
              element={
                <SPVRoute>
                  <TambahGroupStok />
                </SPVRoute>
              }
            />
            <Route
              path="/groupStok/:id"
              element={
                <SPVRoute>
                  <TampilGroupStok />
                </SPVRoute>
              }
            />
            <Route
              path="/groupStok/:id/edit"
              element={
                <SPVRoute>
                  <UbahGroupStok />
                </SPVRoute>
              }
            />
            {/* Stok */}
            <Route
              path="/stok"
              element={
                <SPVRoute>
                  <TampilStok />
                </SPVRoute>
              }
            />
            <Route
              path="/stok/:id"
              element={
                <SPVRoute>
                  <TampilStok />
                </SPVRoute>
              }
            />
            <Route
              path="/stok/:id/edit"
              element={
                <SPVRoute>
                  <UbahStok />
                </SPVRoute>
              }
            />
            <Route
              path="/stok/tambahStok"
              element={
                <SPVRoute>
                  <TambahStok />
                </SPVRoute>
              }
            />
            {/* Pembelian Stok */}
            <Route
              path="/daftarPembelianStok"
              element={
                <SPVRoute>
                  <TampilDaftarPembelianStok />
                </SPVRoute>
              }
            />
            <Route
              path="/daftarPembelianStok/pembelianStok/tambahPembelianStok"
              element={
                <SPVRoute>
                  <TambahPembelianStok />
                </SPVRoute>
              }
            />
            <Route
              path="/daftarPembelianStok/pembelianStok/:id"
              element={
                <SPVRoute>
                  <TampilPembelianStok />
                </SPVRoute>
              }
            />
            <Route
              path="/daftarPembelianStok/pembelianStok/:id/edit"
              element={
                <SPVRoute>
                  <UbahPembelianStok />
                </SPVRoute>
              }
            />
            {/* A Pembelian Stok */}
            <Route
              path="/daftarPembelianStok/pembelianStok/:id/tambahAPembelianStok"
              element={
                <SPVRoute>
                  <TambahAPembelianStok />
                </SPVRoute>
              }
            />
            <Route
              path="/daftarPembelianStok/pembelianStok/:id/:idAPembelianStok"
              element={
                <SPVRoute>
                  <TampilAPembelianStok />
                </SPVRoute>
              }
            />
            {/* Penjualan Stok */}
            <Route
              path="/daftarPenjualanStok"
              element={
                <KSRRoute>
                  <TampilDaftarPenjualanStok />
                </KSRRoute>
              }
            />
            <Route
              path="/daftarPenjualanStok/penjualanStok/:id"
              element={
                <KSRRoute>
                  <TampilPenjualanStok />
                </KSRRoute>
              }
            />
            <Route
              path="/daftarPenjualanStok/penjualanStok/:id/bayar"
              element={
                <KSRRoute>
                  <BayarPenjualanStok />
                </KSRRoute>
              }
            />
            {/* A Penjualan Stok */}
            <Route
              path="/daftarPenjualanStok/penjualanStok/:id/tambahAPenjualanStok"
              element={
                <KSRRoute>
                  <TambahAPenjualanStok />
                </KSRRoute>
              }
            />
            <Route
              path="/daftarPenjualanStok/penjualanStok/:id/:idAPenjualanStok"
              element={
                <KSRRoute>
                  <TampilAPenjualanStok />
                </KSRRoute>
              }
            />
            <Route
              path="/daftarPenjualanStok/penjualanStok/:id/:idAPenjualanStok/edit"
              element={
                <KSRRoute>
                  <UbahAPenjualanStok />
                </KSRRoute>
              }
            />
            {/* Login */}
            <Route path="/login" element={<Login />} />
            {/* Signup */}
            <Route path="/signup" element={<Signup />} />
            {/* Profil User */}
            <Route
              path="/profilUser"
              element={
                <KSRRoute>
                  <ProfilUser />
                </KSRRoute>
              }
            />
            <Route
              path="/profilUser/:id/edit"
              element={
                <KSRRoute>
                  <UbahProfilUser />
                </KSRRoute>
              }
            />
            {/* User */}
            <Route
              path="/user"
              element={
                <SPVRoute>
                  <User />
                </SPVRoute>
              }
            />
            <Route
              path="/user/:id"
              element={
                <SPVRoute>
                  <User />
                </SPVRoute>
              }
            />
            <Route
              path="/user/:id/edit"
              element={
                <SPVRoute>
                  <UbahUser />
                </SPVRoute>
              }
            />
            {/* Not Authorized */}
            <Route path="/unauthorized" element={<ProtectedRoute />} />
          </Routes>
          <Footer />
        </Main>
      </BrowserRouter>
    </Box>
  );
}

const container = {
  display: "flex"
};

const appBarContainer = {
  bgcolor: "primary.main"
};

const brandIconContainer = {
  display: "flex",
  mr: "auto"
};

const brandIcon = {
  my: "auto"
};

const brandIconText = {
  my: "auto",
  ml: 2,
  fontWeight: "bold"
};

const mainContainer = {
  bgcolor: "#fafafa",
  minHeight: "100vh"
};
