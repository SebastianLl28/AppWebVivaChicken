import { Box, Fab } from "@mui/material";
import CartIcon from "@mui/icons-material/ShoppingCart";
import useOpenCarStore from "../store/useOpenCarStore";

const ShoppingCartButton = () => {
  const { isOpen, toggle } = useOpenCarStore();

  return (
    <Box
      sx={{
        "& > :not(style)": { m: 1 },
        bottom: 8,
        right: 8,
        position: "fixed",
        zIndex: 9999,
        display: `${isOpen ? "none" : "block"}`,
      }}
      onClick={toggle}
    >
      <Fab color="primary" aria-label="add" sx={{ height: 80, width: 80 }}>
        <CartIcon sx={{ fontSize: 35 }} />
      </Fab>
    </Box>
  );
};

export default ShoppingCartButton;
