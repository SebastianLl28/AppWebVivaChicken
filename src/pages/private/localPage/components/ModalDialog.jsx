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
import { postLocal } from "../../../../api/loalesAxios";

export const ModalDialog = ({ open, setOpen }) => {

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  //function form modal
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const createLocal = useMutation({
    mutationFn: (data) => postLocal(data),
    onSuccess: () => {
      queryClient.invalidateQueries("getLocales");
    },
    onError: () => {
      alert("Error al crear usuario");
    },
  });

  const onSubmit = (data) => {
    try {
      createLocal.mutate(data);
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
        Agregar Local
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={1.5} width="100%" height="100%" margin={0}>
          <Grid item xs={6}>
            <TextField
              autoFocus
              margin="dense"
              label="Región"
              type="text"
              fullWidth
              variant="outlined"
              {...register("region", { required: true })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              autoFocus
              margin="dense"
              label="Provincia"
              type="text"
              fullWidth
              variant="outlined"
              {...register("provincia", { required: true })}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              autoFocus
              margin="dense"
              label="Distrito"
              type="text"
              fullWidth
              variant="outlined"
              {...register("distrito", { required: true })}
            />
          </Grid>
          <Grid item xs={7}>
            <TextField
              autoFocus
              margin="dense"
              label="coordenadas"
              type="text"
              fullWidth
              variant="outlined"
              {...register("coordenadas", { required: true })}
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
}
