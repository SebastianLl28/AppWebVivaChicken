import axios from "axios";

const instanceUser = axios.create({
  baseURL: "http://localhost:8080/usuarios",
});

export default instanceUser;
