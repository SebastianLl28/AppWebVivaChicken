import { Card, Grid, Typography, CardMedia, CardContent } from "@mui/material";

const CardTestimonials = () => {
  return (
    <Card sx={{ maxWidth: 450, boxShadow: 2 }}>
      <CardContent>
        <Typography color="text.primary">
          Es difícil que un pollo asado no sea bueno, pero lo que comimos acá
          estuvo delicioso y muy grande la porción. La amabilidad del mesero es
          destacable
        </Typography>
      </CardContent>
      <Grid container spacing={1} sx={{ padding: "16px", paddingTop: 0 }}>
        <Grid item>
          <CardMedia
            sx={{ height: 50, width: 50, borderRadius: "50%" }}
            image="./landingPage/person1.jpg"
          />
        </Grid>
        <Grid item>
          <Grid
            container
            direction="column"
            height="100%"
            justifyContent="center"
          >
            <Typography fontWeight="bold" lineHeight={1.1}>
              Sebastian Llamuca
            </Typography>
            <Typography color="text.secondary" variant="body2" lineHeight={1.1}>
              agosto 2017
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CardTestimonials;
