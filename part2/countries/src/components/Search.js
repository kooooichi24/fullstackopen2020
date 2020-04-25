import React from 'react'

const Search = ({ value, setValue }) => {
  const handleChange = (event) => {
    setValue(event.target.value)
  }
  
  return (
    <div>
      find coutries
      <input value={value} onChange={handleChange} />
    </div>
  )
}

export default Search