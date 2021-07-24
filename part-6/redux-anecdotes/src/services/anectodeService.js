import axios from 'axios'

const baseUrl = 'http://localhost:5001/anecdotes'


const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const newNote = {content, votes: 0};
    const response = await axios.post(baseUrl, newNote);
    return response.data; 
}

export default { 
    getAll,
    createNew,
};
