import filterReducer from './filterReducer'
import deepFreeze from 'deep-freeze'

describe('filterReducer', () => {
  test('SET_FILTER', () => {
    const state = ''
    const action = {
      type: 'SET_FILTER',
      filter: 'filter'
    }

    deepFreeze(state)
    const newState = filterReducer(state, action)

    expect(newState).toBe(action.filter)
  })
})