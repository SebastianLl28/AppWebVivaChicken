import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  TextField,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { postUser, putUser } from "../../../../api/client/userAxios";

const ModalDialog = ({ open, setOpen }) => {
  const handleClose = () => {
    setAge("");
    setOpen(false);
    reset();
  };

  const [age, setAge] = useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  //function form modal
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const createUser = useMutation({
    mutationFn: (data) => postUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries("getUsers");
    },
    onError: () => {
      alert("Error al crear usuario");
    },
  });

  const onSubmit = (data) => {
    const user = { enabled: true, ...data };
    try {
      createUser.mutate(user);
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <DialogTitle textAlign="center" variant="h4" fontWeight="500">
        Agregar
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={1.5} width="100%" height="100%" margin={0}>
          <Grid item xs={6}>
            <TextField
              autoFocus
              margin="dense"
              label="Nombres"
              type="text"
              fullWidth
              variant="outlined"
              {...register("name", { required: true })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="Apellidos"
              type="text"
              fullWidth
              variant="outlined"
              {...register("lastname", { required: true })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              label="Correo"
              type="email"
              fullWidth
              variant="outlined"
              {...register("email", { required: true })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              {...register("password", { required: true })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="Numero de telefono"
              type="number"
              fullWidth
              variant="outlined"
              {...register("numphone", { required: true })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="Dni"
              type="number"
              fullWidth
              variant="outlined"
              sx={{ marginBottom: ".8rem" }}
              {...register("dni", { required: true })}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Cargo</InputLabel>
              <Select
                label="Cargo"
                value={age}
                {...register("id_cargo", { required: true })}
                onChange={handleChange}
              >
                <MenuItem value="1">Usuario</MenuItem>
                <MenuItem value="2">Administrador</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Agregar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDialog;
