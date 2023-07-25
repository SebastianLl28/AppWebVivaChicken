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
//* edit
import { putCategory } from "../../../../api/categoryAxios";
import { useEffect } from "react";

const ModalEditDialog = ({
  openEdit,
  setOpenEdit,
  //* edit
  categoryEdit,
  setCategoryEdit,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const handleClose = () => {
    setOpenEdit(false);
    //* edit
    setCategoryEdit(null);
    reset();
  };

  //* edit name, fuction put... , name queryCLient
  const editCategory = useMutation({
    mutationFn: (data) => putCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries("getCategory");
    },
    onError: () => {
      alert("Error al crear usuario");
    },
  });

  const onSubmit = (data) => {
    try {
      //* edit name function , edit data  id: ...Edit.id
      editCategory.mutate({ id: categoryEdit.id, ...data });
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };

  useEffect(() => {
    if (openEdit) {
      // *edit los campos que tendria
      reset({
        nombre: categoryEdit.nombre,
        imagen: categoryEdit.imagen,
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
              //* label
              label="nombre de la categoria"
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
        <Button type="submit">Editar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalEditDialog;
