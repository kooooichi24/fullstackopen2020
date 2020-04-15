import React from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}. You are {props.age} years old.</p>
    </div>
  )
}

const App = () => {
  return (
    <> 
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
    </>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);