import React, { useState, useEffect } from 'react'
import countryService from './services/countries'
import Countries from './components/Countries'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ searchText, setSearchText ] = useState('')

  const hook = (name) => {
    if (!name) {
      setCountries([])
      return
    }
    
    countryService
      .getByName(name)
      .then(countries => {
        setCountries(countries)
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
      <Countries countries={countries} />
    </div>
  )
}

export default App