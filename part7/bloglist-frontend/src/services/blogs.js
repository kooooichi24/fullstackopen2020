import axios from 'axios'
import storage from '../utils/storage'

const baseUrl = '/api/blogs'

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` }
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  const res = await axios.post(baseUrl, newObject, getConfig())
  return res.data
}

const update = async (newObject) => {
  const res = await axios.put(`${baseUrl}/${newObject.id}`, newObject, getConfig())
  return res.data
}

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, getConfig())
}

export default { getAll, create, update, remove }