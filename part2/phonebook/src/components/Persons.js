import React from 'react';

const Persons = ({ persons, filterText }) => {
  const filterPersons = persons.filter(person => {
    return person.name.toLowerCase().indexOf(filterText.toLowerCase()) > -1
  })

  return (
    <div>
      {filterPersons.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
    </div>
  )
}

export default Persons