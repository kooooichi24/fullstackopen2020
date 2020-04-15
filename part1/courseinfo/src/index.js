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
      <Part part={props.parts[0].name} exercise={props.parts[0].exercise} />
      <Part part={props.parts[1].name} exercise={props.parts[1].exercise} />
      <Part part={props.parts[2].name} exercise={props.parts[2].exercise} />
    </div>
  )
}

const Total = (props) => {
  const exercises_arr = props.parts.map(part => part.exercise)
  const total = exercises_arr.reduce((a, x) => a + x)

  return (
    <p>
      Number of exercise {total}
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercise: 10
    },
    {
      name: 'Using props to pass data',
      exercise: 7
    },
    {
      name: 'State of a component',
      exercise: 14
    }
  ]
  
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))