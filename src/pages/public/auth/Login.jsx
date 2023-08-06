import {
  Alert,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { postLogin } from "../../../api/authAxios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [iserror, setIserror] = useState(false);

  useEffect(() => {
    if (iserror) {
      setTimeout(() => {
        setIserror(false);
      }, 3000);
    }
  }, [iserror]);

  const authLogin = useMutation({
    mutationFn: (data) => postLogin(data),
    onSuccess: () => {
      navigate("/dashboardapp");
    },
    onError: () => {
      setIserror(true);
    },
  });

  const onSubmit = (data) => {
    try {
      authLogin.mutate(data);
    } catch (error) {
      console.log("ocurrio un error en Login");
      console.log(error);
    }
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
        {iserror && <Alert severity="error">usuario incorrecto</Alert>}
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
              label="nombre de usuario"
              variant="outlined"
              error={errors.username ? true : false}
              helperText={
                errors.username?.type === "required" &&
                "El username es necesario"
              }
              fullWidth
              {...register("username", {
                required: true,
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
