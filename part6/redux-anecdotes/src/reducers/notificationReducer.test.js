import notificationReducer from './notificationReducer'
import deepFreeze from 'deep-freeze'

describe('notificationReducer', () => {
  test('SET_NOTIFICATION', () => {
    const state = ''
    const action = {
      type: 'SET_NOTIFICATION',
      notification: 'hogehoge'
    }

    deepFreeze(state)
    const newState = notificationReducer(state, action)

    expect(newState).toBe('hogehoge')
  })
})