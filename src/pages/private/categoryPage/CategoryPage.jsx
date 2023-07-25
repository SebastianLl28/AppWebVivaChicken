import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DataGrid from "../../../components/DataGrid";
import { deleteCategory, getCategorias } from "../../../api/categoryAxios";
import { Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { useState } from "react";
import ModalDialog from "./components/ModalDialog";
import ModalEditDialog from "./components/ModalEditDialog";

const CategoryPage = () => {
  const { data, isLoading, isError } = useQuery(["getCategory"], getCategorias);

  const columns = [
    { field: "id", headerName: "id", flex: 0.1 },
    { field: "nombre", headerName: "nombre", flex: 0.6 },
    { field: "imagen", headerName: "imagen", flex: 0.2 },
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

  // * add Category
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  //* delete Category
  const queryClient = useQueryClient();

  const fetchDeleteCategory = useMutation({
    mutationFn: (id) => deleteCategory(id),
    onSuccess: () => queryClient.invalidateQueries("getCategory"),
    onError: (error) => console.log(error),
  });

  const handleDelete = ({ id }) => {
    try {
      fetchDeleteCategory.mutate(id);
    } catch (error) {
      console.log(error);
    }
  };

  //* Edit Category
  const [openEdit, setOpenEdit] = useState(false);
  const [categoryEdit, setCategoryEdit] = useState(null);
  const handleOpenEdit = (data) => {
    setOpenEdit(true);
    setCategoryEdit(data);
  };

  return (
    <Box height="50rem" sx={{ padding: "1rem" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ marginBottom: "1rem" }}
      >
        Agergar Categoria
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
        categoryEdit={categoryEdit}
        setCategoryEdit={setCategoryEdit}
      />
    </Box>
  );
};

export default CategoryPage;
