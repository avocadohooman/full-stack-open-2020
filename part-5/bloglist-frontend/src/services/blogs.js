import axios from 'axios'

const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
    const config = {
        headers: {Authorization: token}
    }
    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
}

const update = async (blog) => {
    let putUrl = baseUrl + '/' + blog.id
    const response = await axios.put(putUrl, blog)
    return response.data;
}

const deleteBlog = async (blog) => {
    const config = {
        headers: {Authorization: token}
    }
    let deleteUrl = baseUrl + '/' + blog.id
    const response = await axios.delete(deleteUrl, config)
    return response.data;
}

export default { getAll, setToken, create, update, deleteBlog }