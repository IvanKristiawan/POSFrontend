import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { tempUrl } from "../../contexts/ContextProvider";
import { Loader } from "../../components";

const TambahPenjualanStok = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    saveUser();
  }, []);

  const saveUser = async (e) => {
    const today = new Date();
    const date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    try {
      setLoading(true);
      const nextPenjualanStok = await axios.get(
        `${tempUrl}/penjualanStoksCount`
      );
      const response = await axios.post(`${tempUrl}/penjualanStoks`, {
        nomorNota: nextPenjualanStok.data,
        tanggal: date
      });
      setLoading(false);
      navigate(`/daftarPenjualanStok/penjualanStok/${response.data._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }
};

export default TambahPenjualanStok;
