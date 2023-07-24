import { Container } from "@mui/material";
import { Testimonials, Promotions, SwipeSlider, Company } from "./components";

const LandingPage = () => {
  return (
    <>
      <SwipeSlider />
      <Container maxWidth="xl" sx={{ paddingBlock: 5 }}>
        <Promotions />
        <Company />
        <Testimonials />
      </Container>
    </>
  );
};

export default LandingPage;
