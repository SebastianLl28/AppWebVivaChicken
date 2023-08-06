import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DataGrid from "../../../components/DataGrid";
import { Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { useState } from "react";
import ModalDialog from "./components/ModalDialog";
import ModalEditDialog from "./components/ModalEditDialog";
import { deleteClientes, getClientes } from "../../../api/clientesAxios";

const ClientesPage = () => {
  const { data, isLoading, isError } = useQuery(["getClientes"], getClientes);

  const columns = [
    { field: "id", headerName: "Id", flex: 0.05 },
    { field: "nombre", headerName: "Nombre", flex: 0.1 },
    { field: "apellido", headerName: "Apellido", flex: 0.1 },
    { field: "email", headerName: "Email", flex: 0.1 },
    { field: "password", headerName: "Password", flex: 0.1 },
    { field: "telefono", headerName: "Telefono", flex: 0.1 },
    { field: "direccion", headerName: "Direccion", flex: 0.1 },
    { field: "dni", headerName: "Dni", flex: 0.1 },
    { field: "ruc", headerName: "Ruc", flex: 0.1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.1,
      renderCell: (params) => (
        <Box display="flex" gap={1.5}>
          <CreateIcon
            sx={{ cursor: "pointer" }}
            color="warning"
            onClick={() => handleOpenEdit(params.row)}
          >
            Eliminar
          </CreateIcon>
          <DeleteIcon
            sx={{ cursor: "pointer" }}
            color="error"
            onClick={() => handleDelete(params.row)}
          >
            Editar
          </DeleteIcon>
        </Box>
      ),
    },
  ];

  // * add Cliente
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  //* delete Cliente
  const queryClient = useQueryClient();

  const fetchDeleteClientes = useMutation({
    mutationFn: (id) => deleteClientes(id),
    onSuccess: () => queryClient.invalidateQueries("getClientes"),
    onError: (error) => console.log(error),
  });

  const handleDelete = ({ id }) => {
    try {
      fetchDeleteClientes.mutate(id);
    } catch (error) {
      console.log(error);
    }
  };

  //* Edit Cliente
  const [openEdit, setOpenEdit] = useState(false);
  const [clienteEdit, setClienteEdit] = useState(null);
  const handleOpenEdit = (data) => {
    setOpenEdit(true);
    setClienteEdit(data);
  };

  return (
    <Box height="50rem" sx={{ padding: "1rem" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ marginBottom: "1rem" }}
      >
        Agergar Clienteo
      </Button>
      <DataGrid
        columns={columns}
        data={data}
        isLoading={isLoading}
        isError={isError}
      />
      <ModalDialog open={open} setOpen={setOpen} />
      <ModalEditDialog
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        clienteEdit={clienteEdit}
        setClienteEdit={setClienteEdit}
      />
    </Box>
  );
};

export default ClientesPage;
