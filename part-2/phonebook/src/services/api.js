import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons/'

const getAll = () => {
    return axios.get(baseUrl);
}

const addContact = () => {
    return axios.post(baseUrl);
}

const deleteContact = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
}

export default {
    getAll: getAll, 
    addContact: addContact, 
    deleteContact: deleteContact 
}