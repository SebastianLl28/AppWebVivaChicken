import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { putLocal } from "../../../../api/loalesAxios";
import { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";

export const ModaleditDialog = ({ openEdit, setOpenEdit, localEdit, setLocalEdit }) => {

  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const handleClose = () => {
    setOpenEdit(false);
    setLocalEdit(null);
    reset();
  };

  
  //* edit name, fuction put... , name queryCLient
  const editLocal = useMutation({
    mutationFn: (data) => putLocal(data),
    onSuccess: () => {
      queryClient.invalidateQueries("getLocal");
    },
    onError: () => {
      alert("Error al crear el local");
    },
  });

  const onSubmit = (data) => {
    try {
      editLocal.mutate({ id: localEdit.id, ...data });
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };

  useEffect(() => {
    if (openEdit) {
      // *edit los campos que tendria
      reset({
        region: localEdit.region,
        provincia: localEdit.provincia,
        distrito: localEdit.distrito,
        coordenadas: localEdit.coordenadas,
        direccion: localEdit.direccion,
        imagen: localEdit.imagen
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
        Editar Local
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
        <Button type="submit">Editar</Button>
      </DialogActions>
    </Dialog>
  )
}
