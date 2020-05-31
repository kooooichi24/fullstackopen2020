import React from 'react'
import { connect } from 'react-redux'
import { incrementVotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes.filter(anecdote => {
    const filter = props.filter.toLowerCase()
    return anecdote.content.toLowerCase().indexOf(filter) > -1

    // Alternative way to filtering
    // return anecdote.content.toLowerCase().includes(filter)
  })

  const vote = (anecdote) => {
    props.incrementVotes(anecdote)
    props.setNotification(`you voted '${anecdote.content}'`, 5)
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