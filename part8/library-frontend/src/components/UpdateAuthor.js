import React, { useState, useEffect} from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_BOOKS, ALL_AUTHORS } from '../utils/querys'

const UpdateAuthor = ({ show }) => {
  const [ name, setName ] = useState('')
  const [ born, setBorn ] = useState('')
  const [ authors, setAuthors ] = useState(null)
  const result = useQuery(ALL_AUTHORS)
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS } ]
  })
  
  useEffect(() => {
    if (result.data) {
      setAuthors(result.data.allAuthors.map(authors => authors.name))
    }
  }, [result])

  const submit = async (event) => {
    event.preventDefault()
    
    editAuthor({ 
      variables: { 
        name, 
        setBornTo: Number(born) 
      }
    })

    setName('')
    setBorn('')
  }

  if (!show || !authors) {
    return null
  }

  const optionTag = []
  authors.forEach(author => optionTag.push(<option value={author}>{author}</option>))

  return (
    <div>
      <h3>Set birthyear</h3>

      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map(author => {
              return <option value={author} key={author}>{author}</option>
            })}
          </select>
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