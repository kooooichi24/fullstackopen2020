import React from 'react'
import { createStore } from 'redux'

// reducer
const noteReducer = (state=[], action) => {
  switch (action.type) {
    // case action type
    case 'NEWNOTE':
      return state.push(action.data)
  }
}

// store
const store = createStore(noteReducer)

// action
// dispatch
store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'the app state is in redux store',
    important: true,
    id: 1
  }
})

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
})

const App = () => {
  return (
    <div>
      <ul>
        {store.getState().map(note => {
          <li>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        })}
      </ul>
    </div>
  );
}

export default App;