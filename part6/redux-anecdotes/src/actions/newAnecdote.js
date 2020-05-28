const getId = () => (100000 * Math.random()).toFixed(0)

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      id: getId(),
      content,
      votes: 0
    }
  }
}