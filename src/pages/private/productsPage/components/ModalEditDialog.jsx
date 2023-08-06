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
import { useEffect } from "react";
import { putProduct } from "../../../../api/productsAxios";
import { useState } from "react";
import { getCategorias } from "../../../../api/categoryAxios";

const ModalEditDialog = ({ openEdit, setOpenEdit, productEdit, setProductEdit }) => {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const handleClose = () => {
    setOpenEdit(false);
    setAge("")
    setProductEdit(null);
    reset();
  };

  const [age, setAge] = useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  //* edit name, fuction put... , name queryCLient
  const editProducts = useMutation({
    mutationFn: (data) => putProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries("getProducts");
    },
    onError: () => {
      alert("Error al crear el products");
    },
  });

  const { data: categorias, isLoading, error } = useQuery(["getCategorias"], getCategorias);

  const onSubmit = (data) => {
    try {
      const product = {id: productEdit.id, nombre: data.nombre, descripcion: data.descripcion, precio: parseFloat(data.precio), stock: parseInt(data.stock), imagen: data.imagen, categoria: {id: data.id_categoria}}
      editProducts.mutate(product);
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };

  useEffect(() => {
    if (openEdit) {
      // *edit los campos que tendria
      console.log(productEdit)
      reset({
        nombre: productEdit.nombre,
        descripcion: productEdit.descripcion,
        precio: productEdit.precio,
        stock: productEdit.stock,
        imagen: productEdit.imagen,
        id_categoria: productEdit.categoria.id
      });
      setAge(productEdit.categoria.id)
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
        Editar Producto
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

export default ModalEditDialog;
