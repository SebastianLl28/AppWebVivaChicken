import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/usuarios",
});

export const postLogin = async (dataLogin) => {
  const { data } = await api.post("/auth", dataLogin);
  return data;
};
