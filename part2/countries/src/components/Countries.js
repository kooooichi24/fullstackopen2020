import React from 'react'
import Country from './Country'

const Countries = ({ countries, setValue }) => {
  if (countries.length === 0) {
    return (
      <div>
        no matches
      </div>
    )
  } else if (countries.length === 1) {
    return (
      <Country country={countries[0]} />
    )
  } else if (countries.length < 10) {
    return (
      <div>
        {countries.map(country => 
          <div key={country.numericCode}>
            {country.name}
            <button onClick={() => setValue(country.name)}>
              show
            </button>
          </div>
        )}
      </div>
    )
  }
  return (
    <div>
      Too many matches, specify another filter
    </div>
  )
}

export default Countries