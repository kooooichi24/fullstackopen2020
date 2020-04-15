import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts.part1} exercise={props.exercises.exercise1} />
      <Part part={props.parts.part2} exercise={props.exercises.exercise2} />
      <Part part={props.parts.part3} exercise={props.exercises.exercise3} />
    </div>
  )
}

const Total = (props) => {
  return (
    <p>
      Number of exercise {props.exercises.exercise1 + props.exercises.exercise2 + props.exercises.exercise3}
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercise1 = 10
  const part2 = 'Using props to pass data'
  const exercise2 = 7
  const part3 = 'State of a component'
  const exercise3 = 14
  const parts = {
    "part1": part1,
    "part2": part2,
    "part3": part3,
  }
  const exercises = {
    "exercise1": exercise1,
    "exercise2": exercise2,
    "exercise3": exercise3,
  }
  
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} exercises={exercises} />
      <Total exercises={exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))