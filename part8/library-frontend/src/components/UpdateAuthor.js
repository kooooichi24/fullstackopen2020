import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_BOOKS, ALL_AUTHORS } from '../utils/querys'

const UpdateAuthor = ({ show }) => {
  const [ name, setName ] = useState('')
  const [ born, setBorn ] = useState('')
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS } ]
  })

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    
    console.log('update author...')
    editAuthor({ 
      variables: { 
        name, 
        setBornTo: Number(born) 
      }
    })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h3>Set birthyear</h3>

      <form onSubmit={submit}>
        <div>
          name
          <input value={name} onChange={({ target }) => setName(target.value)} />
        </div>
        <div>
          born
          <input value={born} onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default UpdateAuthor