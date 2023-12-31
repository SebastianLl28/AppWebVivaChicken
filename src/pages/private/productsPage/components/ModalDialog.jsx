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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { postProduct } from "../../../../api/productsAxios";
import { useState } from "react";
import { getCategorias } from "../../../../api/categoryAxios";

const ModalDialog = ({ open, setOpen }) => {
  const handleClose = () => {
    setAge("")
    setOpen(false);
    reset();
  };

  const [age, setAge] = useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const { data: categorias, isLoading, error } = useQuery(["getCategorias"], getCategorias);

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
      const producto = {imagen: data.imagen, descripcion: data.descripcion, nombre: data.nombre, precio: parseFloat(data.precio), stock: parseInt(data.stock), categoria: {id: data.id_categoria}}
      createProduct.mutate(producto);
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
        Agregar Producto
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={1.5} width="100%" height="100%" margin={0}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              label="Nombre del producto"
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
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
              {...register("stock", { required: true })}
            />
          </Grid>
          <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
            <Select
              label="Categoria"
              value={age}
              {...register("id_categoria", { required: true })}
              onChange={handleChange}
            >
              {categorias?.map( categoria => (
                <MenuItem key={categoria.id} value={categoria.id}>{categoria.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              label="Imagen"
              type="text"
              fullWidth
              variant="outlined"
              {...register("imagen", { required: true })}
            />
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
