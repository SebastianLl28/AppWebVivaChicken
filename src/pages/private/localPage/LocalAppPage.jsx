import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteLocal, getLocales } from "../../../api/loalesAxios"
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { Box, Button } from "@mui/material";
import DataGrid from "../../../components/DataGrid";
import { ModalDialog } from "./components/ModalDialog";
import { useState } from "react";
import { ModaleditDialog } from "./components/ModaleditDialog";

export const LocalAppPage = () => {
  const { data, isLoading, isError } = useQuery(["getLocal"], getLocales)

  const columns = [
    { field: "id", headerName: "Id", flex: 0.05 }, 
    { field: "region", headerName: "Region", flex: 0.1 },
    { field: "direccion", headerName: "Direccion", flex: 0.3 },
    { field: "provincia", headerName: "Provincia", flex: 0.1 },
    { field: "distrito", headerName: "Distrito", flex: 0.1 },
    { field: "coordenadas", headerName: "Coordenadas", flex: 0.2 },
    { field: "imagen", headerName: "Imagen", flex: 0.1, renderCell: (params) =>
      <img src={params.row.imagen} alt="" width="auto" height="90%" />
    },
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
    }
  ]

  // Add local
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const queryClient = useQueryClient();
  const fetchDeleteLocales = useMutation({
    mutationFn: (id) => deleteLocal(id),
    onSuccess: () => queryClient.invalidateQueries("getLocal"),
    onError: (error) => console.log(error),
  });

  const handleDelete = ({ id }) => {
    try {
      fetchDeleteLocales.mutate(id);
    } catch (error) {
      console.log(error);
    }
  };

  //* Edit Local
  const [openEdit, setOpenEdit] = useState(false);
  const [localEdit, setLocalEdit] = useState(null);
  const handleOpenEdit = (data) => {
    setOpenEdit(true);
    setLocalEdit(data);
  };

  
  return (
    <Box height="50rem" sx={{ padding: "1rem" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ marginBottom: "1rem" }}
      >
        Agergar Local
      </Button>
      <DataGrid
        columns={columns}
        data={data}
        isLoading={isLoading}
        isError={isError}
      />
      <ModalDialog open={open} setOpen={setOpen} />
      <ModaleditDialog
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        localEdit={localEdit}
        setLocalEdit={setLocalEdit}
      />
    </Box>
  )
}
