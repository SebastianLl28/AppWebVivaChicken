import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Main>
      <Box
        component="form"
        sx={{
          backgroundColor: "#fff",
          padding: 3,
          boxShadow: 1,
          borderRadius: 2,
        }}
        display="grid"
        gap={2}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography align="center" variant="h4" component="h1" fontWeight={500}>
          Iniciar Sesión
        </Typography>
        <Grid
          container
          rowSpacing={3}
          sx={{
            borderRadius: "10px",
            width: "400px",
          }}
        >
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Correo"
              variant="outlined"
              error={errors.email ? true : false}
              helperText={
                (errors.email?.type === "required" &&
                  "El correo es necesario") ||
                (errors.email?.type === "pattern" &&
                  "El formato debe ser correo")
              }
              fullWidth
              {...register("email", {
                required: true,
                pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Contraseña"
              variant="outlined"
              type="password"
              fullWidth
              error={errors.password ? true : false}
              helperText={
                errors.password?.type === "required"
                  ? "El campo es obligatorio"
                  : ""
              }
              {...register("password", { required: true })}
            />
          </Grid>
        </Grid>
        <Button variant="contained" type="submit" fullWidth size="large">
          Ingresar
        </Button>
        <Typography
          align="center"
          variant="body2"
          component={Link}
          to="/register"
          sx={{ color: "primary.main", textDecoration: "none" }}
        >
          ¿No tienes una cuenta? Registrate
        </Typography>
      </Box>
    </Main>
  );
};

export default Login;

const Main = styled("main")`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 93px);
`;
