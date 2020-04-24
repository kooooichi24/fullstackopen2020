import React, { useState, useEffect } from 'react'
import axios from 'axios'

const DisplayWeather = ({weather}) => {
  if (weather.length === 0) return ''
  const style = {
    width: '100px',
    height: '100px'
  }
  return (
    <div>
      <h2>Weather in {weather.location.name}</h2>
      <p><b>temperature: </b>{weather.current.temperature} Celius</p>
      <img 
        src={weather.current.weather_icons[0]}
        alt={weather.current.weather_descriptions[0]}
        style={style}
      />
      <p><b>wind: </b>{weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
    </div>
  )
}

const DisplayCountry = ({country}) => {
  const [weather, setWeather] = useState([])

  const hook = () => {
    const capital = country.capital
    if (!capital) {
      setWeather({})
      return
    }
    console.log('effect')
    const api_key = process.env.REACT_APP_API_KEY
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
      .then(response => {
        console.log('promise fulfilled')
        setWeather(response.data)        
      })
  }
  useEffect(hook, [country.capital])

  const style = {
    width: '150px',
    height: '150px'
  }
  return (
    <div>
      <div>
        <h2>{country.name}</h2>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h2>languages</h2>
        <ul>
          {country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
        </ul>
        <img src={country.flag} alt={country.name} style={style} />
      </div>
      <DisplayWeather weather={weather} />
    </div>
  )
}

const DisplayCountries = ({countries}) => {
  const [country, setCountry] = useState([])

  if (countries.length === 0) {
    return ''
  } else if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (countries.length > 1) {
    return (
      <div>
        {countries.map(country => {
          return (
            <div key={country.numericCode}>
              {country.name}
              <button onClick={() => setCountry([country])}>
                show
              </button>
            </div>
          )
        })}
        {country.length === 1 ? <DisplayCountry country={country[0]} /> : ''}
      </div>
    )
  } else {
    return <DisplayCountry country={countries[0]} />
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchText, setSearchText] = useState('')

  const hook = (name) => {
    if (!name) {
      setCountries([])
      return
    }
    
    console.log('effect')
    axios
      .get(`https://restcountries.eu/rest/v2/name/${name}`)
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  const handleTextChange = (event) => {
    const value = event.target.value
    setSearchText(value)

    hook(value)
  }

  return (
    <div>
      <div>
        find coutries 
        <input value={searchText} onChange={handleTextChange} />
      </div>
      <DisplayCountries countries={countries} />
    </div>
  )
}

export default App