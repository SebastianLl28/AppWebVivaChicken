import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { postClientes } from "../../../../api/clientesAxios";

const ModalDialog = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
    reset();
  };


  //function form modal
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const createProduct = useMutation({
    mutationFn: (data) => postClientes(data),
    onSuccess: () => {
      queryClient.invalidateQueries("getClientes");
    },
    onError: () => {
      alert("Error al crear usuario");
    },
  });

  const onSubmit = (data) => {
    try {
      createProduct.mutate({ estado: true, ...data });
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
        Agregar Clientes
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={1.5} width="100%" height="100%" margin={0}>
          <Grid item xs={6}>
            <TextField
              autoFocus
              margin="dense"
              label="Nombre"
              type="text"
              fullWidth
              variant="outlined"
              {...register("nombre", { required: true })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              autoFocus
              margin="dense"
              label="Apellido"
              type="text"
              fullWidth
              variant="outlined"
              {...register("apellido", { required: true })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              label="direccion"
              type="text"
              fullWidth
              variant="outlined"
              {...register("direccion", { required: true })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              autoFocus
              margin="dense"
              label="dni"
              type="text"
              fullWidth
              variant="outlined"
              {...register("dni")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              autoFocus
              margin="dense"
              label="ruc"
              type="text"
              fullWidth
              variant="outlined"
              {...register("ruc")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              label="email"
              type="text"
              fullWidth
              variant="outlined"
              {...register("email", { required: true })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              label="contraseña"
              type="text"
              fullWidth
              variant="outlined"
              {...register("password", { required: true })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              label="telefono"
              type="text"
              fullWidth
              variant="outlined"
              {...register("telefono", { required: true })}
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
