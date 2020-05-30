import React, { useEffect } from 'react';
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import Visibility from './components/VisibilityFilter'
import { initializeNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeNotes())
  }, [dispatch])

  return (
    <div>
      <NewNote />
      <Visibility />
      <Notes />
    </div>
  );
}

export default App