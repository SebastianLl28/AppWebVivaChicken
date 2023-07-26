import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/productos",
});

export const getProducts = async () => {
  const { data } = await api.get("/");
  return data;
};

export const postProduct = async (product) => {
  const { data } = await api.post("/create", product);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/delete/${id}`);
  return data;
};

export const putProduct = async (product) => {
  const { data } = await api.put(`/update/${product.id}`, product);
  return data;
};
