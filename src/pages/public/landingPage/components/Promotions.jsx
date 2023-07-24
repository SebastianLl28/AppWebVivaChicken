import { Grid } from "@mui/material";
import { Title } from "../../../../style/Text";
import CardPromocion from "./CardPromocion";

const Promotions = () => {
  return (
    <>
      <Title>¿Qué hay de nuevo?</Title>
      <Grid
        container
        spacing={1}
        flexWrap={{ md: "nowrap" }}
        direction={{ xs: "column", sm: "column", md: "row" }}
        justifyContent={{ md: "space-between" }}
        alignItems={{ xs: "center", md: "start" }}
      >
        <Grid item>
          <CardPromocion />
        </Grid>
        <Grid item>
          <CardPromocion />
        </Grid>
        <Grid item>
          <CardPromocion />
        </Grid>
      </Grid>
    </>
  );
};

export default Promotions;
