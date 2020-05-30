import React from 'react';
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import Visibility from './components/VisibilityFilter'

const App = () => {
  return (
    <div>
      <NewNote />
      <Visibility />
      <Notes />
    </div>
  );
}

export default App