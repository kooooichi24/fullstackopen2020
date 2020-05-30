import anecdoteService from '../services/anecdotes'

// reducer
const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTE':
      return action.data
    case 'VOTE':
      const id = action.data.updateObj.id
      return state.map(anecdote => anecdote.id !== id ? anecdote : action.data.updateObj)
    default:
      return state
  }
}


// action creator
export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.creatNew(content)

    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTE',
      data: anecdotes
    })
  }
}

export const incrementVotes = (incrementObj) => {
  return async dispatch => {
    const updateObj = await anecdoteService.update(incrementObj)

    dispatch({
      type: 'VOTE',
      data: { updateObj }
    })
  }
}

export default anecdoteReducer