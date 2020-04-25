import React, { useState, useEffect } from 'react'
import weatherService from '../services/weather'

import Weather from './Weather'

const Country = ({ country }) => {
  const [ weather, setWeather ] = useState(null)

  useEffect(() => {
    const capital = country.capital
    if (!capital) {
      setWeather(null)
      return
    }
    
    weatherService
      .getByLocation(capital)
      .then(weatherInfo => {
        setWeather(weatherInfo)
      })
  }, [country.capital])

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
      <Weather weather={weather} />
    </div>
  )
}

export default Country