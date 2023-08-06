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
import { putClientes } from "../../../../api/clientesAxios";

const ModalEditDialog = ({
  openEdit,
  setOpenEdit,
  //* edit
  clienteEdit,
  setClienteEdit,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const handleClose = () => {
    setOpenEdit(false);
    //* edit
    setClienteEdit(null);
    reset();
  };

  //* edit name, fuction put... , name queryCLient
  const editCliente = useMutation({
    mutationFn: (data) => putClientes(data),
    onSuccess: () => {
      queryClient.invalidateQueries("getClientes");
    },
    onError: () => {
      alert("Error al crear el cliente");
    },
  });

  const onSubmit = (data) => {
    try {
      //* edit name function , edit data  id: ...Edit.id
      editCliente.mutate({ id: clienteEdit.id, ...data });
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };

  useEffect(() => {
    if (openEdit) {
      // *edit los campos que tendria
      reset({
        nombre: clienteEdit.nombre,
        apellido: clienteEdit.apellido,
        email: clienteEdit.email,
        password: clienteEdit.password,
        telefono: clienteEdit.telefono,
        direccion: clienteEdit.direccion,
        dni: clienteEdit.dni,
        ruc: clienteEdit.ruc,
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
              {...register("apellido")}
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
        <Button type="submit">Editar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalEditDialog;
