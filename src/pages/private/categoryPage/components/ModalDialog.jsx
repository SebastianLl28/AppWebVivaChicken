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
import { postCategory } from "../../../../api/categoryAxios";

const ModalDialog = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  //function form modal
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const createCategory = useMutation({
    mutationFn: (data) => postCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries("getCategory");
    },
    onError: () => {
      alert("Error al crear usuario");
    },
  });

  const onSubmit = (data) => {
    try {
      createCategory.mutate(data);
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
