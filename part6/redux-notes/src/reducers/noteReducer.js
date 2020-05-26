import React from 'react';

// reducer
const noteReducer = (state=[], action) => {
  switch (action.type) {
    // case action type
    case 'NEW_NOTE':
      return state.concat(action.data)
    default:
      return state
  }
}

export default noteReducer