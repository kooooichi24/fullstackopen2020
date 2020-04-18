import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistic = ({ value, text }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const totalCount = good + neutral + bad
  const totalValue = good - bad
  const statistics = {
    all: totalCount,
    average: totalValue / totalCount,
    positive: ((good / totalCount) * 100) + " %"
  }

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>No feedback given</div>
    )
  } else {
    return (
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={statistics.all} />
          <Statistic text="average" value={statistics.average} />
          <Statistic text="positive" value={statistics.positive} />
        </tbody>
      </table>
    )
  }
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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
);