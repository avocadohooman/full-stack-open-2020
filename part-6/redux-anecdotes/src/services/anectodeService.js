import axios from 'axios'

const baseUrl = 'http://localhost:5001/anecdotes'


const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const newAnectode = {content, votes: 0};
    const response = await axios.post(baseUrl, newAnectode);
    return response.data; 
}

const updateVote = async (content, id) => {
    const updateAnectode = {...content, votes: content.votes + 1};
    const response = await axios.put(`${baseUrl}/${id}`, updateAnectode);
    return response.data
}

export default { 
    getAll,
    createNew,
    updateVote
};
