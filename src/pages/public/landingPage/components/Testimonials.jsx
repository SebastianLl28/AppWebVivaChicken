import { Grid, styled } from "@mui/material";
import CardTestimonials from "./CardTestimonials";
import { Title } from "../../../../style/Text";

const Testimonials = () => {
  return (
    <Main>
      <Title>Testimonios</Title>
      <Grid
        container
        spacing={1}
        flexWrap={{ md: "nowrap" }}
        direction={{ xs: "column", sm: "column", md: "row" }}
        justifyContent={{ md: "space-between" }}
        alignItems={{ xs: "center", md: "start" }}
      >
        <Grid item>
          <CardTestimonials />
        </Grid>
        <Grid item>
          <CardTestimonials />
        </Grid>
        <Grid item>
          <CardTestimonials />
        </Grid>
      </Grid>
    </Main>
  );
};

export default Testimonials;

const Main = styled("section")`
  padding-top: 3rem;
`;
