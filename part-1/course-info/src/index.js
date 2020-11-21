import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {

	return (
		<>
			<h1>
				{props.course}
			</h1>
		</>
	)
}

const Content = (props) => {

	return (
		<>
			<Part part={props.parts[0].name} exercise={props.parts[0].exercises}/>
			<Part part={props.parts[1].name} exercise={props.parts[1].exercises}/>
			<Part part={props.parts[2].name} exercise={props.parts[2].exercises}/>
		</>
	)
}

const Part = (props) => {

	return (
		<>
			<h3>{props.part}</h3>
			<p>Number of Exercises: {props.exercise}</p>
		</>
	)
}

const Total = (props) => {

	return (
		<h2>Total amount of Exercises: {props.totalAmountOfExercises}</h2>
	)
}

const App = () => {
	const course = {
		name: 'Half Stack application development',
		parts: [
			{
				name: 'Fundamental of React',
				exercises: 10
			},
			{
				name: 'Using props to pass data',
				exercises: 7
			},
			{
				name: 'State of a component',
				exercises: 14
			}
		]
	}
	return (
		<>
			<Header course={course.name}/>
			<Content parts = {course.parts}/>
			<Total totalAmountOfExercises={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}/>
		</>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
