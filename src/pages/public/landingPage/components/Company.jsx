import { Grid, Paper, Typography, autocompleteClasses } from "@mui/material";
import { Title } from "../../../../style/Text";

const Company = () => {
  return (
    <Grid container sx={{ paddingBlock: 7 }}>
      <Grid item xs={12}>
        <Paper
          sx={{
            height: 700,
            position: "relative",
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.38), rgba(0, 0, 0, 0.38)), url(./landingPage/local-1.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "top",
          }}
        >
          <Paper
            sx={{
              position: "absolute",
              bottom: -80,
              left: { xs: "1rem", md: "20%" },
              right: { xs: "1rem", md: "20%" },
              zIndex: 1,
              padding: "16px",
            }}
          >
            <Title position="center">Mas sobre Viva Chicken</Title>
            <Typography textAlign="center">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere
              adipisci repellendus voluptates tempora odit, ipsum veniam
              distinctio dicta, iusto optio iste! Dicta, temporibus officiis
              maxime nostrum repellat repudiandae soluta provident aliquid porro
              pariatur corrupti corporis? Incidunt, quia laboriosam consectetur
              adipisci asperiores ea voluptatem. Tempore, ea quo? Provident fuga
              impedit odio neque saepe voluptate officiis eveniet itaque
              molestias velit, assumenda perferendis accusamus doloremque veniam
              ipsam dolorem omnis eligendi aspernatur unde. Deserunt vel odio
              neque possimus sed, perferendis eligendi? Inventore obcaecati
              harum quos sed possimus. Vel qui aliquid, veritatis inventore,
              voluptatibus impedit repellat modi omnis voluptatem harum odio hic
              dolorem, facere expedita!
            </Typography>
          </Paper>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Company;
