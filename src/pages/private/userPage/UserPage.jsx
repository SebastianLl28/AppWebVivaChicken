import { Box, Button } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getUsers } from "../../../api/client/userAxios";
import DataGrid from "../../../components/DataGrid";
import { useState } from "react";
import ModalDialog from "./components/ModalDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import ModalEditDialog from "./components/ModalEditDialog";

const UserPage = () => {
  const { data, isLoading, isError } = useQuery(["getUsers"], getUsers);

  const columns = [
    { field: "id", headerName: "id", flex: 0.04 },
    { field: "username", headerName: "nombre de usuario", flex: 0.11 },
    { field: "password", headerName: "contraseña", flex: 0.13 },
    { field: "cargo", headerName: "cargo", flex: 0.13, renderCell: (params) => params.row.cargo.nombre } ,
    { field: "estado", headerName: "estado", flex: 0.08 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.05,
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

  //* Add user
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const queryClient = useQueryClient();
  const fetchdeleteUser = useMutation({
    mutationFn: (id) => deleteUser(id),
    onSuccess: () => queryClient.invalidateQueries("getUsers"),
    onError: (error) => console.log(error),
  });

  //* Delete user
  const handleDelete = ({ id }) => {
    try {
      fetchdeleteUser.mutate(id);
    } catch (error) {
      console.log(error);
    }
  };

  //* Edit User
  const [openEdit, setOpenEdit] = useState(false);
  const [userEdit, setUserEdit] = useState(null);
  const handleOpenEdit = (data) => {
    setOpenEdit(true);
    setUserEdit(data);
  };

  return (
    <Box width="100%" height="50rem" sx={{ padding: "1rem" }}>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: "1rem" }}
        onClick={handleOpen}
      >
        Agregar Usuario
      </Button>
      <DataGrid
        data={data}
        columns={columns}
        isLoading={isLoading}
        isError={isError}
      />
      <ModalDialog open={open} setOpen={setOpen} />
      <ModalEditDialog
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        userEdit={userEdit}
        setUserEdit={setUserEdit}
      />
    </Box>
  );
};

export default UserPage;
