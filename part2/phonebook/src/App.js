import React, { useState, useEffect } from 'react';
import personServices from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterText, setFilterText ] = useState('')

  const hook = () => {
    console.log('effect')
    personServices
      .getAll()
      .then(initialState => {
        console.log('promise fulfilled')
        setPersons(initialState)
      })
  }
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const index = persons.findIndex(p => p.name === newName)
    if (index > -1) {
      const id = persons[index].id
      const person = persons.find(p => p.id === id)
      const changedPerson = { ...person, number: newNumber }
      
      personServices
        .update(id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    } else {
      personServices
        .create(personObject)
        .then(returnObject => {
          setPersons(persons.concat(returnObject))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)

    persons.forEach(person => {
      if (person.name === event.target.value) {
        alert(`${person.name} is already added to phonebook`)
      }
    })
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFiltereChange = (event) => {
    console.log(event.target.value)
    setFilterText(event.target.value)
  }

  const deletePersonOf = (deletePerson) => {
    const message = `Delete ${deletePerson.name} ?`
    if (window.confirm(message)) {
      personServices
        .deletePerson(deletePerson.id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== deletePerson.id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFiltereChange} filterText={filterText} />

      <h2>add a new</h2>
      <PersonForm 
        onSubmit={addPerson}
        onPersonChange={handlePersonChange}
        newName={newName}
        onNumberChange={handleNumberChange}
        newNumber={newNumber}
      />
      
      <h2>Numbers</h2>
      <Persons persons={persons} filterText={filterText} deletePerson={deletePersonOf} />
    </div>
  )
}

export default App