import React, { useState, useEffect } from 'react'
import axios from 'axios'

const DisplayCountry = ({country}) => {
  const style = {
    width: '150px',
    height: '150px'
  }
  return (
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