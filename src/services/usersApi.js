import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const usersApi = {
    
getUsers: async () => {
const res = await axios.get(API_URL);
return res.data;
},

createUser: async (data) => {
const res = await axios.post(API_URL, data);
return res.data;
},

updateUser: async (id, data) => {
const res = await axios.put(`${API_URL}/${id}`, data);
return res.data;
},

deleteUser: async (id) => {
const res = await axios.delete(`${API_URL}/${id}`);
return res.data;
}

};

export default usersApi;