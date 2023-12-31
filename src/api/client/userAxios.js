import instanceUser from "../config/instanceUser";

export const getUsers = async () => {
  const res = await instanceUser.get();
  return res.data;
};

export const postUser = async (user) => {
  const res = await instanceUser.post("/create", user);
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await instanceUser.delete(`/delete/${id}`);
  return res.data;
};

export const putUser = async (user) => {
  await instanceUser.put(`/update/${user.id}`, user);
};
