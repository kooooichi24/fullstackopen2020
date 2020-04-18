import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const DisplayAnecdote = ({ text, points }) => {
  return (
    <div>
      <div>{text}</div>
      <div>has {points} votes</div>
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const maxVoteIndex = points.indexOf(Math.max(...points))

  const handleNext = () => {
    const rand = Math.floor(Math.random() * anecdotes.length)
    setSelected(rand)
  }

  const handleVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      <h1>Anecdotes of the day</h1>
      <DisplayAnecdote text={anecdotes[selected]} points={points.selected} />
      <Button handleClick={handleVote} text="vote" />
      <Button handleClick={handleNext} text="next anecdotes" />

      <h1>Anecdotes with most votes</h1>
      <DisplayAnecdote text={anecdotes[maxVoteIndex]} points={points[maxVoteIndex]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
);