import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { useState } from "react";
import { Box, Button } from "@mui/material";
import DataGrid from "../../../components/DataGrid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCargo, getCargos } from "../../../api/cargosAxios";
import ModalDialog from "./components/ModalDialog";
import ModalEditDialog from "./components/ModalEditDialog";

const CargoPage = () => {
  const { data, isLoading, isError } = useQuery(["getCargos"], getCargos);

  const columns = [
    { field: "id", headerName: "id", flex: 0.1 },
    { field: "nombre", headerName: "nombre", flex: 0.8 },
    {
      field: "actions",
      headerName: "actions",
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

  //* Add Cargo
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const queryClient = useQueryClient();
  const fetchdeleteCargo = useMutation({
    mutationFn: (id) => deleteCargo(id),
    onSuccess: () => queryClient.invalidateQueries("getCargos"),
    onError: (error) => alert.log(error),
  });

  //* Delete Cargo
  const handleDelete = ({ id }) => {
    try {
      fetchdeleteCargo.mutate(id);
    } catch (error) {
      console.log(error);
    }
  };

  //* Edit Cargo
  const [openEdit, setOpenEdit] = useState(false);
  const [cargoEdit, setCargoEdit] = useState(null);

  const handleOpenEdit = (data) => {
    setOpenEdit(true);
    setCargoEdit(data);
  };

  return (
    <Box width="100%" height="50rem" sx={{ padding: "1rem" }}>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: "1rem" }}
        onClick={handleOpen}
      >
        Agregar Cargo
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
        cargoEdit={cargoEdit}
        setCargoEdit={setCargoEdit}
      />
    </Box>
  );
};

export default CargoPage;
