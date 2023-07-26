import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DataGrid from "../../../components/DataGrid";
import { Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { useState } from "react";
import ModalDialog from "./components/ModalDialog";
import ModalEditDialog from "./components/ModalEditDialog";
import { getProducts } from "../../../api/productsAxios";

const ProductsAppPage = () => {
  const { data, isLoading, isError } = useQuery(["getProduct"], getProducts);

  const columns = [
    { field: "id", headerName: "Id", flex: 0.1 },
    { field: "nombre", headerName: "Nombre", flex: 0.2 },
    { field: "descripcion", headerName: "Descripción", flex: 0.3 },
    { field: "precio", headerName: "Precio", flex: 0.1 },
    { field: "stock", headerName: "Stock", flex: 0.1 },
    { field: "imagen", headerName: "Imagen", flex: 0.2 },
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

  // * add Product
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  //* delete Product
  const queryClient = useQueryClient();

  const fetchDeleteProduct = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => queryClient.invalidateQueries("getProduct"),
    onError: (error) => console.log(error),
  });

  const handleDelete = ({ id }) => {
    try {
      fetchDeleteProduct.mutate(id);
    } catch (error) {
      console.log(error);
    }
  };

  //* Edit Product
  const [openEdit, setOpenEdit] = useState(false);
  const [productEdit, setProductEdit] = useState(null);
  const handleOpenEdit = (data) => {
    setOpenEdit(true);
    setProductEdit(data);
  };

  return (
    <Box height="50rem" sx={{ padding: "1rem" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ marginBottom: "1rem" }}
      >
        Agergar Producto
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
        productEdit={productEdit}
        setProductEdit={setProductEdit}
      />
    </Box>
  );
};

export default ProductsAppPage;
