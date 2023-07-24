import { Outlet } from "react-router-dom";
import BarNavigation from "../../components/BarNavigation";
import { Box, Fab, styled } from "@mui/material";
import CartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartButton from "../../components/ShoppingCartButton";
import ShoppingCar from "../../components/ShoppingCar";

const PublicPage = () => {
  return (
    <>
      <BarNavigation />
      <Main>
        <Outlet />
        <ShoppingCartButton />
        <ShoppingCar />
      </Main>
    </>
  );
};

export default PublicPage;

const Main = styled("main")`
  background-color: #f6f9fc;
  position: relative;
`;
