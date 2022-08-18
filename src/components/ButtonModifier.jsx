import React from "react";
import { useNavigate } from "react-router-dom";
import { ButtonGroup, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const ButtonModifier = ({ id, kode, addLink, editLink, deleteUser }) => {
  let navigate = useNavigate();
  return (
    <ButtonGroup variant="contained">
      <Button
        color="success"
        sx={{ bgcolor: "success.light", textTransform: "none" }}
        startIcon={<AddCircleOutlineIcon />}
        size="small"
        onClick={() => {
          navigate(addLink);
        }}
      >
        Tambah
      </Button>
      {kode && (
        <>
          {editLink && (
            <Button
              color="primary"
              startIcon={<EditIcon />}
              sx={{ textTransform: "none" }}
              onClick={() => {
                navigate(editLink);
              }}
            >
              Ubah
            </Button>
          )}
          <Button
            color="error"
            startIcon={<DeleteOutlineIcon />}
            sx={{ textTransform: "none" }}
            onClick={() => deleteUser(id)}
          >
            Hapus
          </Button>
        </>
      )}
    </ButtonGroup>
  );
};

export default ButtonModifier;
