import axios from 'axios'

const baseUrl = 'http://api.weatherstack.com/current'
const api_key = process.env.REACT_APP_API_KEY

const getByLocation = (location) => {
  const request = axios.get(`${baseUrl}?access_key=${api_key}&query=${location}`)
  return request.then(response => response.data.current)
}

export default { getByLocation }