import axios from 'axios';

const controller = {
    getUsers: () => axios.get("/api/user"),
    getUser: (id) => axios.get(`/api/user/${id}`),
    addUser: (name, login) =>  axios.post("/api/user", {name, login}),
    updUser: (id, name, login) => axios.put(`/api/user/${id}`, {name, login})
}

export default controller;