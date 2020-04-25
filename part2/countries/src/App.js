import React, { useState, useEffect } from 'react'
import countryService from './services/countries'
import Countries from './components/Countries'
import Search from './components/Search'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    countryService
      .getAll()
      .then(allCountries => {
        setCountries(allCountries)
      })
  }, [])

  const filteredContries = filter.length === 1 
                            ? countries
                            : countries.filter(c => c.name.toLowerCase().indexOf(filter.toLowerCase()) > -1) 

  return (
    <div>
      <Search 
        value={filter} 
        setValue={setFilter} 
      />
      <Countries 
        countries={filteredContries}
        setValue={setFilter}
      />
    </div>
  )
}

export default App