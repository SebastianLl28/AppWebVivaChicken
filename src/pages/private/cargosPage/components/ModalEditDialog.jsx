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
import { postCargo, putCargo } from "../../../../api/cargosAxios";
import { useEffect } from "react";

const ModalEditDialog = ({
  openEdit,
  setOpenEdit,
  cargoEdit,
  setCargoEdit,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const handleClose = () => {
    setOpenEdit(false);
    setOpenEdit(false);
    setCargoEdit(null);
    reset();
  };

  const editCargo = useMutation({
    mutationFn: (data) => putCargo(data),
    onSuccess: () => {
      queryClient.invalidateQueries("getCargos");
    },
    onError: () => {
      alert("Error al crear usuario");
    },
  });

  const onSubmit = (data) => {
    try {
      editCargo.mutate({ id: cargoEdit.id, ...data });
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };

  useEffect(() => {
    if (openEdit) {
      reset({
        nombre: cargoEdit.nombre,
      });
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
        Editar Cargo
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={1.5} width="100%" height="100%" margin={0}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              label="Nombre del Cargo"
              type="text"
              fullWidth
              variant="outlined"
              {...register("nombre", { required: true })}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Editar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalEditDialog;
