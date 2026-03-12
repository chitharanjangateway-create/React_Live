import axios from "axios";

const BASE_URL = "https://attendence-e1edb-default-rtdb.firebaseio.com/users";

/* GET USERS */
export const getUsers = () => axios.get(`${BASE_URL}.json`);

/* CREATE USER */
export const createUser = (data) =>
  axios.post(`${BASE_URL}.json`, data);

/* UPDATE USER */
export const updateUser = (id, data) =>
  axios.put(`${BASE_URL}/${id}.json`, data);

/* DELETE USER */
export const deleteUser = (id) =>
  axios.delete(`${BASE_URL}/${id}.json`);