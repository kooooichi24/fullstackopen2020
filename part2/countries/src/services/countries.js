import axios from 'axios'

const baseUrl = 'https://restcountries.eu/rest/v2/name'

const getByName= (name) => {
  const request = axios.get(`${baseUrl}/${name}`)
  return request.then(response => response.data)
}

export default { getByName }