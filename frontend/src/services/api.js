import axios from "axios";

const LIVRE_API = "http://localhost:3001";
const EMPRUNT_API = "http://localhost:3002";

export const getBooks = () => axios.get(`${LIVRE_API}/books`);
export const createBook = (data) => axios.post(`${LIVRE_API}/books`, data);

export const getEmprunts = () => axios.get(`${EMPRUNT_API}/emprunts`);
export const createEmprunt = (data) => axios.post(`${EMPRUNT_API}/emprunts`, data);
export const returnBook = (id) =>
  axios.put(`${EMPRUNT_API}/emprunts/${id}`, {
    dateRetour: new Date(),
  });