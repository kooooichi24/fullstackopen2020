import React, { useState, useEffect } from 'react'
import weatherService from '../services/weather'

import Weather from './Weather'

const Country = ({ country }) => {
  const [ weather, setWeather ] = useState(null)

  useEffect(() => {
    weatherService
      .getByLocation(country.capital)
      .then(weatherCurrent => {
        setWeather(weatherCurrent)
      })
  }, [country])

  return (
    <div>
      <div>
        <h2>{country.name}</h2>

        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        
        <h3>languages</h3>
        <ul>
          {country.languages.map(language => 
            <li key={language.iso639_1}>
              {language.name}
            </li>
          )}
        </ul>
        <div>
          <img src={country.flag} height="80px" alt={country.name} />
        </div>
      </div>
      <Weather weather={weather} city={country.capital} />
    </div>
  )
}

export default Country