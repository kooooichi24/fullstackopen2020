import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const creatNew = async (content) => {
  const obj = { content, votes: 0 }
  const res = await axios.post(baseUrl, obj)
  return res.data
}

const update = async (updateObj) => {
  console.log(updateObj)
  const res = await axios.put(`${baseUrl}/${updateObj.id}`, updateObj)
  console.log(res)
  return res.data
}

export default { getAll, creatNew, update }