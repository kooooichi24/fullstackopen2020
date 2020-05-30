import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementVotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(anecdote => anecdote.content.indexOf(state.filter) > -1)
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    const updateObj = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    dispatch(incrementVotes(updateObj))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5000))
  }

  const sortAnecdotes = anecdotes.sort((a,b) => b.votes - a.votes)

  return (
    <React.Fragment>
      {sortAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export default AnecdoteList