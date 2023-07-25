import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/cargos",
});

export const getCargos = async () => {
  const res = await api.get();
  return res.data;
};

export const deleteCargo = async (id) => {
  const res = await api.delete(`/delete/${id}`);
  return res.data;
};

export const postCargo = async (cargo) => {
  const res = await api.post("/create", cargo);
  return res.data;
};

export const putCargo = async (cargo) => {
  const res = await api.put(`/update/${cargo.id}`, cargo);
  return res.data;
};
