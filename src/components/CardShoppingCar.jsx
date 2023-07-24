import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/client/productosAxios";
import {
  Box,
  Chip,
  Divider,
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
  styled,
} from "@mui/material";
import { useProductsStore } from "../store/useProductsStore";
import { useEffect } from "react";

// const CardShoppingCar = ({ registro: { id, count }, index }) => {
const CardShoppingCar = ({ registro, index }) => {
  const { addCarrito, substractProduct, restarCarrito } = useProductsStore();

  return (
    <>
      {index !== 0 && <Divider />}
      {/* <Divider /> */}
      <ListItem key={registro.id} disablePadding>
        <ListItemButton sx={{ display: "flex", gap: 1 }} disableTouchRipple>
          <ListItemIcon sx={{ position: "relative" }}>
            <Box
              component="img"
              src={registro.imagen}
              alt="product"
              width={160}
              borderRadius={3}
            />
            <Chip
              label={`$ ${registro.precio}`}
              color="primary"
              sx={{ position: "absolute", top: -10, left: -10 }}
            />
          </ListItemIcon>
          <Grid
            container
            height={110}
            alignItems={"center"}
            position="relative"
            // bgcolor="red"
            maxWidth={300}
          >
            {/*! ESTO NO ES */}
            <Grid item xs={9}>
              <Typography variant="h5" fontWeight="bold">
                {registro.nombre}
              </Typography>
              <Grid item xs={11} alignItems={"center"}>
                <Typography noWrap title={registro.descripcion}>
                  {registro.descripcion}
                </Typography>
              </Grid>
              <Grid container alignItems="center" columnGap={1}>
                <Box
                  bgcolor="#ff8e86"
                  paddingX={1.2}
                  paddingY={0.5}
                  fontWeight={"bold"}
                  component="div"
                  onClick={() => restarCarrito(registro.id)}
                >
                  -
                </Box>
                <Typography>{registro.count}</Typography>
                <Box
                  bgcolor="#70ad63"
                  paddingX={1.2}
                  paddingY={0.5}
                  fontWeight={"bold"}
                  component="div"
                  onClick={() => addCarrito(registro)}
                >
                  +
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6" fontWeight="bold">
                S/. {registro.precio * registro.count}
              </Typography>
            </Grid>
            <Box
              bgcolor="#ff5347"
              sx={{ position: "absolute", right: 0, top: 0 }}
              width={"1.5rem"}
              height={"1.5rem"}
              display={"flex"}
              justifyContent={"center"}
              borderRadius={"50%"}
              color={"white"}
              component="div"
              onClick={() => substractProduct(registro.id)}
            >
              x
            </Box>
          </Grid>
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default CardShoppingCar;
