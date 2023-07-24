import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { Fragment } from "react";
import useOpenCarStore from "../store/useOpenCarStore";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, IconButton, List, Typography } from "@mui/material";
import { useProductsStore } from "../store/useProductsStore";
import CardShoppingCar from "./CardShoppingCar";
import { useState } from "react";

const ShoppingCar = () => {
  const { isOpen, toggle } = useOpenCarStore();

  const toggleDrawer = () => (event) => {
    toggle(!isOpen);
  };

  const { carrito } = useProductsStore();

  const list = () => (
    <Box sx={{ width: 500 }} role="presentation" position="relative">
      <IconButton
        onClick={() => toggle(false)}
        title="Cerrar"
        sx={{ float: "right", zIndex: 999, position: "relative" }}
      >
        <CloseIcon />
      </IconButton>

      <List>
        {carrito.map((registro, index) => (
          <CardShoppingCar
            key={registro.id}
            registro={registro}
            index={index}
          />
        ))}
      </List>
      <Box
        bgcolor="rgba(0, 0, 0, 0.8)"
        height="8rem"
        position="fixed"
        bottom={0}
        component={Grid}
        container
        color="#fff"
        p={2}
        sx={{ width: 500 }}
        alignContent="space-between"
      >
        <Grid item width="100%">
          <Grid container width="100%" justifyContent="space-between">
            <Typography variant="h4" fontWeight="bold">
              Total:
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              S/.
            </Typography>
          </Grid>
        </Grid>
        <Grid item width="100%">
          <Button variant="contained" color="primary" fullWidth size="large">
            Comprar
          </Button>
        </Grid>
      </Box>
    </Box>
  );

  return (
    <Fragment>
      <Button onClick={toggleDrawer()} />
      <Drawer anchor={"right"} open={isOpen} onClose={toggleDrawer()}>
        {list()}
      </Drawer>
    </Fragment>
  );
};
export default ShoppingCar;
