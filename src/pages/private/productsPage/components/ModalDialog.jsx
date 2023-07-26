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
  Select,
  TextField,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { postProduct } from "../../../../api/productsAxios";
import { useState } from "react";

const ModalDialog = ({ open, setOpen }) => {
  const handleClose = () => {
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

  const createProduct = useMutation({
    mutationFn: (data) => postProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries("getProduct");
    },
    onError: () => {
      alert("Error al crear usuario");
    },
  });

  const onSubmit = (data) => {
    try {
      createProduct.mutate(data);
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
        Agregar Categoria
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={1.5} width="100%" height="100%" margin={0}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              label="Nombre de la categoria"
              type="text"
              fullWidth
              variant="outlined"
              {...register("nombre", { required: true })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              label="Descripción"
              type="text"
              fullWidth
              variant="outlined"
              {...register("descripcion", { required: true })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              autoFocus
              margin="dense"
              label="precio"
              type="number"
              fullWidth
              variant="outlined"
              {...register("precio", { required: true })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              autoFocus
              margin="dense"
              label="stock"
              type="number"
              fullWidth
              variant="outlined"
              {...register("stock", { required: true })}
            />
          </Grid>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Agregar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDialog;
