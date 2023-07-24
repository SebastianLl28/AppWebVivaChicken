import { Box, Container, Pagination } from "@mui/material";
import { Categories, Order, ListProduct } from "./components";

const ProductPage = () => {
  return (
    <Container maxWidth="xl" sx={{ pt: 6, display: "grid", gap: 4.5 }}>
      <Categories />
      <Order />
      <ListProduct />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Pagination count={10} color="primary" />
      </Box>
    </Container>
  );
};

export default ProductPage;
