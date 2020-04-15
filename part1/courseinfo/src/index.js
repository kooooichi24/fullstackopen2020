import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <React.Fragment>
      <p>
        {props.parts.part1} {props.exercises.exercise1}
      </p>
      <p>
        {props.parts.part2} {props.exercises.exercise2}
      </p>
      <p>
        {props.parts.part3} {props.exercises.exercise3}
      </p>
    </React.Fragment>
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