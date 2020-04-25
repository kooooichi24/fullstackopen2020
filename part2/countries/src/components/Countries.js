import React, { useState } from 'react'
import Country from './Country'

const Countries = ({countries}) => {
  const [ country, setCountry ] = useState([])

  if (countries.length === 0) {
    return null
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
        { country.length === 1 ? <Country country={country[0]} /> : null }
      </div>
    )
  } else {
    return <Country country={countries[0]} />
  }
}

export default Countries