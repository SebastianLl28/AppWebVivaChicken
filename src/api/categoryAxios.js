import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/categorias",
});

export const getCategorias = async () => {
  const response = await api.get();
  return response.data;
};

export const postCategory = async (data) => {
  const response = await api.post("/create", data);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await api.delete(`/delete/${id}`);
  return response.data;
};

export const putCategory = async (data) => {
  const response = await api.put(`/update/${data.id}`, data);
  return response.data;
};
