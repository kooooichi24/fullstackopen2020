import React from 'react'
import { connect } from 'react-redux'
import { incrementVotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes.filter(anecdote => {
    return anecdote.content.indexOf(props.filter) > -1
  })

  const vote = (anecdote) => {
    const updateObj = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    props.incrementVotes(updateObj)
    props.setNotification(`you voted '${anecdote.content}'`, 5000)
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

const mapStateToProps = (state) => {
  // sometimes it is useful to console log from mapStateToProps
  console.log(state)

  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  incrementVotes,
  setNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList