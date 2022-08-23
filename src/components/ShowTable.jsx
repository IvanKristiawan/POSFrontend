import * as React from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useStateContext } from "../contexts/ContextProvider";

export function ShowTableSupplier({ currentPosts, searchTerm }) {
  const { screenSize } = useStateContext();
  let navigate = useNavigate();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Kode</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Nama</TableCell>
            {screenSize >= 600 && (
              <>
                <TableCell
                  sx={{
                    fontWeight: "bold"
                  }}
                >
                  Alamat
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Kota</TableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.namaSupplier
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.kodeSupplier
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.alamatSupplier
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.kota.toUpperCase().includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: "#eeeeee" },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/supplier/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.kodeSupplier}
                </TableCell>
                <TableCell>{user.namaSupplier}</TableCell>
                {screenSize >= 600 && (
                  <>
                    <TableCell>{user.alamatSupplier}</TableCell>
                    <TableCell>{user.kota}</TableCell>
                  </>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableGroupStok({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Kode</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Nama Group</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.namaGroup
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.kodeGroup.toUpperCase().includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: "#eeeeee" },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/groupStok/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.kodeGroup}
                </TableCell>
                <TableCell>{user.namaGroup}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableStok({ currentPosts, searchTerm }) {
  const { screenSize } = useStateContext();
  let navigate = useNavigate();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Kode</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Nama Stok</TableCell>
            {screenSize >= 600 && (
              <>
                <TableCell
                  sx={{
                    fontWeight: "bold"
                  }}
                >
                  Sat-K
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Sat-B</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Konv.</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Harga Jual - K
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Harga Jual - B
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Barcode</TableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.namaStok.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.kodeStok.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.kodeBarcode
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.satuanKecil
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.satuanBesar.toUpperCase().includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: "#eeeeee" },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/stok/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.kodeStok}
                </TableCell>
                <TableCell>{user.namaStok}</TableCell>
                {screenSize >= 600 && (
                  <>
                    <TableCell>{user.satuanKecil}</TableCell>
                    <TableCell>{user.satuanBesar}</TableCell>
                    <TableCell>
                      {user.konversi && user.konversi.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {user.hargaJualKecil &&
                        user.hargaJualKecil.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {user.hargaJualBesar &&
                        user.hargaJualBesar.toLocaleString()}
                    </TableCell>
                    <TableCell>{user.kodeBarcode}</TableCell>
                  </>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableDaftarPembelianStok({
  currentPosts,
  searchTerm,
  suppliers
}) {
  const { screenSize } = useStateContext();
  let navigate = useNavigate();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>No. Nota</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Tanggal</TableCell>
            {screenSize >= 600 && (
              <>
                <TableCell sx={{ fontWeight: "bold" }}>Jenis</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Kode Supplier</TableCell>
              </>
            )}
            <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.nomorNota.includes(searchTerm) ||
                val.tanggal.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.jenis.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.kodeSupplier
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: "#eeeeee" },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/daftarPembelianStok/pembelianStok/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.nomorNota}
                </TableCell>
                <TableCell>{user.tanggal}</TableCell>
                {screenSize >= 600 && (
                  <>
                    <TableCell>{user.jenis}</TableCell>
                    <TableCell>
                      {user.kodeSupplier} -
                      {suppliers
                        .filter(
                          (supplier) =>
                            supplier.kodeSupplier === user.kodeSupplier
                        )
                        .map((sup) => ` ${sup.namaSupplier}`)}
                    </TableCell>
                  </>
                )}
                <TableCell>{user.total.toLocaleString()}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTablePembelianStok({ id, currentPosts, stoks, nomorNota }) {
  const { screenSize } = useStateContext();
  let navigate = useNavigate();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Kode Stok</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Nama Stok</TableCell>
            {screenSize >= 600 && (
              <>
                <TableCell sx={{ fontWeight: "bold" }}>Qty</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Harga</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Potongan</TableCell>
              </>
            )}
            <TableCell sx={{ fontWeight: "bold" }}>Subtotal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (val.nomorNota === nomorNota) {
                return val;
              }
            })
            .map((aPembelianStok, index) => (
              <TableRow
                key={aPembelianStok.kodeStok}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: "#eeeeee" },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(
                    `/daftarPembelianStok/pembelianStok/${id}/${aPembelianStok._id}`
                  );
                }}
              >
                <TableCell component="th" scope="row">
                  {aPembelianStok.kodeStok}
                </TableCell>
                <TableCell>
                  {stoks
                    .filter((stok) => stok.kodeStok === aPembelianStok.kodeStok)
                    .map((stk) => ` ${stk.namaStok}`)}
                </TableCell>
                {screenSize >= 600 && (
                  <>
                    <TableCell>{aPembelianStok.qty.toLocaleString()}</TableCell>
                    <TableCell>
                      {aPembelianStok.hargaSatuan.toLocaleString()}
                    </TableCell>
                    <TableCell>{aPembelianStok.potongan}%</TableCell>
                  </>
                )}
                <TableCell>
                  {aPembelianStok.subtotal.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableDaftarPenjualanStok({ currentPosts, searchTerm }) {
  const { screenSize } = useStateContext();
  let navigate = useNavigate();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>No. Nota</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Tanggal</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.nomorNota.includes(searchTerm) ||
                val.tanggal.toUpperCase().includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: "#eeeeee" },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/daftarPenjualanStok/penjualanStok/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.nomorNota}
                </TableCell>
                <TableCell>{user.tanggal}</TableCell>
                <TableCell>{user.total.toLocaleString()}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTablePenjualanStok({ id, currentPosts, stoks, nomorNota }) {
  const { screenSize } = useStateContext();
  let navigate = useNavigate();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Kode Stok</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Nama Stok</TableCell>
            {screenSize >= 600 && (
              <>
                <TableCell sx={{ fontWeight: "bold" }}>Qty</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Harga</TableCell>
              </>
            )}
            <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (val.nomorNota === nomorNota) {
                return val;
              }
            })
            .map((aPenjualanStok, index) => (
              <TableRow
                key={aPenjualanStok.kodeStok}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: "#eeeeee" },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(
                    `/daftarPenjualanStok/penjualanStok/${id}/${aPenjualanStok._id}`
                  );
                }}
              >
                <TableCell component="th" scope="row">
                  {aPenjualanStok.kodeStok}
                </TableCell>
                <TableCell>
                  {stoks
                    .filter((stok) => stok.kodeStok === aPenjualanStok.kodeStok)
                    .map((stk) => ` ${stk.namaStok}`)}
                </TableCell>
                {screenSize >= 600 && (
                  <>
                    <TableCell>{aPenjualanStok.qty.toLocaleString()}</TableCell>
                    <TableCell>
                      {aPenjualanStok.hargaSatuan.toLocaleString()}
                    </TableCell>
                  </>
                )}
                <TableCell>{aPenjualanStok.total.toLocaleString()}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableUser({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Username</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Tipe user</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Kode Nota</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.username.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.tipeUser.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.kodeNota.toUpperCase().includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: "#eeeeee" },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/user/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.username}
                </TableCell>
                <TableCell>{user.tipeUser}</TableCell>
                <TableCell>{user.kodeNota}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
