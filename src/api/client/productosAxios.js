import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/productos",
});

export const getProducts = async () => {
  const res = await api.get();
  return res.data;
};

export const getProductById = async (ctx) => {
  const [, id] = ctx.queryKey;
  const res = await api.get(`/${id}`);
  return res.data;
};
