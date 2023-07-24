import { Box, Grid, Typography } from "@mui/material";
import { useProductsStore } from "../../../../store/useProductsStore";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../../../api/client/productosAxios";
import CardProduct from "./CardProduct";

const ListProduct = () => {
  const { data, isLoading, isError } = useQuery(["getProducts"], getProducts);

  if (isError)
    return (
      <Box width="100%" textAlign="center">
        Error de Servidor, la culpa lo tiene{" "}
        <Typography fontWeight="bold">Jorge Villanueva</Typography>
      </Box>
    );

  return (
    <Box width="100%">
      <Grid
        container
        gap={{ xs: 2, sm: 2.5, md: 3, lg: 4.2 }}
        justifyContent="center"
      >
        {isLoading
          ? "Cargando..."
          : data.map((product) => (
              <CardProduct key={product.id} product={product} />
            ))}
      </Grid>
    </Box>
  );
};

export default ListProduct;
