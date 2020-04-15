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
      <Part part={props.parts.part1.name} exercise={props.parts.part1.exercise} />
      <Part part={props.parts.part2.name} exercise={props.parts.part2.exercise} />
      <Part part={props.parts.part3.name} exercise={props.parts.part3.exercise} />
    </div>
  )
}

const Total = (props) => {
  return (
    <p>
      Number of exercise {props.parts.part1.exercise + props.parts.part2.exercise + props.parts.part3.exercise}
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercise: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercise: 7
  }
  const part3 = {
    name: 'State of a component',
    exercise: 14
  }
  const parts = {
    part1: part1,
    part2: part2,
    part3: part3,
  }
  
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))