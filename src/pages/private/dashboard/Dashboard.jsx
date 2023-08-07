import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import { Header } from "./components/Header";

const Dashboard = () => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Header />
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Inicio sesión correctamente
        </Alert>
      </Snackbar>
    </>
  );
};

export default Dashboard;
