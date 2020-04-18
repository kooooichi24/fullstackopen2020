import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const DisplayResult = ({ value, text }) => {
  return (
    <div>{text} {value}</div>
  )
}

const App = (props) => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClick = () => setGood(good + 1)
  const neutralClick = () => setNeutral(neutral + 1)
  const badClick = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={goodClick} text="good"/>
      <Button handleClick={neutralClick} text="neutral"/>
      <Button handleClick={badClick} text="bad"/>
      
      <h1>statistics</h1>
      <DisplayResult value={good} text="good" />
      <DisplayResult value={neutral} text="neutral" />
      <DisplayResult value={bad} text="bad" />
    </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
);