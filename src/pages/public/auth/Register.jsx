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

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log({
      ...data,
      numphone: parseInt(data.numphone),
      dni: parseInt(data.dni),
      enabled: true,
      id_cargo: "1",
    });
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
          Registro
        </Typography>
        <Grid
          container
          rowSpacing={3}
          columnSpacing={2}
          sx={{
            borderRadius: "10px",
            width: "450px",
          }}
        >
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Nombres"
              variant="outlined"
              fullWidth
              error={errors.name ? true : false}
              helperText={
                errors.name?.type === "required" && "El nombre es necesario"
              }
              {...register("name", { required: true })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Apellidos"
              variant="outlined"
              fullWidth
              error={errors.lastname ? true : false}
              helperText={
                errors.lastname?.type === "required" &&
                "El apellido es necesario"
              }
              {...register("lastname", { required: true })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Correo"
              variant="outlined"
              fullWidth
              error={errors.email ? true : false}
              helperText={
                (errors.email?.type === "required" &&
                  "El correo es necesario") ||
                (errors.email?.type === "pattern" &&
                  "El formato debe ser correo")
              }
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
              fullWidth
              type="password"
              error={errors.password ? true : false}
              helperText={
                errors.password?.type === "required" &&
                "El contraseña es necesario"
              }
              {...register("password", { required: true })}
            />
          </Grid>
          <Grid item container spacing={2} xs={12}>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                type="number"
                fullWidth
                label="Telefono"
                error={errors.numphone ? true : false}
                helperText={
                  (errors.numphone?.type === "required" &&
                    "El telefono es necesario") ||
                  (errors.numphone?.type === "pattern" &&
                    "Tiene que haber 9 dígitos")
                }
                {...register("numphone", {
                  required: true,
                  pattern: /^[0-9]{9}$/,
                })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                type="number"
                fullWidth
                label="Dni"
                error={errors.dni ? true : false}
                helperText={
                  (errors.dni?.type === "required" &&
                    "El telefono es necesario") ||
                  (errors.dni?.type === "pattern" &&
                    "Tiene que haber 8 dígitos")
                }
                {...register("dni", { required: true, pattern: /^[0-9]{8}$/ })}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              type="text"
              label="Dirección"
              fullWidth
              // {...register("direccion")}
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
          to="/login"
          sx={{ color: "primary.main", textDecoration: "none" }}
        >
          ¿Ya tienes una cuenta? Inicia Sesión
        </Typography>
      </Box>
    </Main>
  );
};

export default Register;

const Main = styled("main")`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 93px);
`;
