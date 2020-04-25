import React from 'react';

const Persons = ({ persons, filterText, deletePerson }) => {
  const filterPersons = persons.filter(person => {
    return person.name.toLowerCase().indexOf(filterText.toLowerCase()) > -1
  })

  return (
    <div>
      {filterPersons.map(person => {
        return (
          <div key={person.name}>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person)}>delete</button>
          </div>
        )
      })}
    </div>
  )
}

export default Persons