import axios from 'axios';

const baseUrl = '/api/persons';

const getAll = () => {
    return axios.get(baseUrl);
}

const addContact = (newContact) => {
    return axios.post(baseUrl, newContact);
}

const deleteContact = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const updateContact = (id, newContact) => {
    return axios.put(`${baseUrl}/${id}`, newContact);
}

export default {
    getAll: getAll,
    addContact: addContact,
    deleteContact: deleteContact,
    updateContact: updateContact
}