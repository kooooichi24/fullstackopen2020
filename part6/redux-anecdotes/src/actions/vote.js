export const incrementVotes = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}