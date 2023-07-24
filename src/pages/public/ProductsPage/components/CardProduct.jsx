import { Box, Button, Grid, Typography, styled } from "@mui/material";
import { useEffect } from "react";
import { useProductsStore } from "../../../../store/useProductsStore";

const CardProduct = ({ product }) => {
  const { addCarrito } = useProductsStore();

  return (
    <Grid container component="div" item xs={12} sm={5.5} md={3.77} lg={3.8}>
      <Grid item xs={12} overflow="hidden" borderRadius={2}>
        <Box
          bgcolor="red"
          display="flex"
          position="relative"
          overflow="hidden"
          sx={{
            "&:hover>div": {
              display: "flex",
            },
          }}
        >
          <Image src={product.imagen} alt="" sx={{ position: "relative" }} />
          <Box
            position="absolute"
            width="100%"
            height="100%"
            bgcolor="rgba(0, 0, 0, 0.5)"
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
            gap={2}
            component="div"
            sx={{
              display: "none",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => addCarrito(product.id)}
            >
              Agregar Carrito
            </Button>
            <Button variant="contained" color="primary">
              Ver detalles
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={9}>
        <Typography variant="h5" fontWeight="bold">
          {product.nombre}
        </Typography>
        <Typography variant="body1" noWrap title={product.description}>
          {product.descripcion}
        </Typography>
      </Grid>
      <Grid
        item
        xs={3}
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Typography
          fontSize={{ xs: "2.5em", sm: "2rem", lg: "2.5rem" }}
          fontWeight="bold"
        >
          S/.{product.precio}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CardProduct;

const Image = styled("img")`
  width: 100%;
  height: auto;
  object-fit: contain;
`;
