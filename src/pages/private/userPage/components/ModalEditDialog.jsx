import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  TextField,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { putUser } from "../../../../api/client/userAxios";

const ModalEditDialog = ({ openEdit, setOpenEdit, userEdit, setUserEdit }) => {
  const handleClose = () => {
    setAge("");
    setUserEdit(null);
    setOpenEdit(false);
    reset();
  };

  const [age, setAge] = useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const editUser = useMutation({
    mutationFn: (data) => putUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries("getUsers");
    },
    onError: (err) => {
      alert("Error al crear usuario");
      console.log(err);
    },
  });

  const onSubmit = (data) => {
    try {
      console.log(data);
      // editUser.mutate({ id: userEdit.id, ...data });
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (openEdit) {
      reset({
        username: userEdit.username,
        password: userEdit.password,
        estado: userEdit.estado,
      });
      console.log("agasas");
      console.log(userEdit);
    }
  }, [openEdit]);

  return (
    <Dialog
      open={openEdit}
      onClose={handleClose}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <DialogTitle textAlign="center" variant="h4" fontWeight="500">
        Editar Usuario
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
              {...register("username", { required: true })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="Apellidos"
              type="text"
              fullWidth
              variant="outlined"
              {...register("password", { required: true })}
            />
          </Grid>
          <Grid item xs={12}>
            {/* <FormControl fullWidth>
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
            </FormControl> */}
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  {...register("estado", { required: false })}
                  defaultChecked={userEdit?.estado ? true : false}
                />
              }
              label="Estado"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Actualizar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalEditDialog;
