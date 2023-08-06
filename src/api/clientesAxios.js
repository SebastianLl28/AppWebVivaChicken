import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/clientes",
});

export const getClientes = async () => {
  const { data } = await api.get("/");
  return data;
};

export const postClientes = async (cliente) => {
  const { data } = await api.post("/create", cliente);
  return data;
};

export const putClientes = async (cliente) => {
  const { data } = await api.put(`/update/${cliente.id}`, cliente);
  return data;
};

export const deleteClientes = async (id) => {
  const { data } = await api.delete(`/delete/${id}`);
  return data;
};
