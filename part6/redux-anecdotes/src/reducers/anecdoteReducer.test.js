import anecdoteReducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdoteReducer', () => {
  test('returns votes+1 with action VOTE', () => {
    const state = [
      {
        id: 1,
        content: 'If it hurts, do it more often',
        votes: 0
      },
      {
        id: 2,
        content: 'Adding manpower to a late software project makes it later!',
        votes: 0
      }
    ]
    const action = {
      type: 'VOTE',
      data: {
        id: 1
      }
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState).toContainEqual({
      id: 1,
      content: 'If it hurts, do it more often',
      votes: 1
    },)
  })
})