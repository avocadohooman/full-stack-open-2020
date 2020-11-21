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
			<Part part={props.parts[0]} exercise={props.exercises[0]}/>
			<Part part={props.parts[1]} exercise={props.exercises[1]}/>
			<Part part={props.parts[2]} exercise={props.exercises[2]}/>
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
	const course = 'Half Stack application development'
	const exercise1 = 10
	const exercise2 = 7
	const exercise3 = 14
	const totalAmountOfExercises = exercise1 + exercise2 + exercise3
	const parts = [
		'Fundamental of React',
		'Using props to pass data',
		'State of a component'
	]
	const exercises = [
		exercise1,
		exercise2,
		exercise3
	]

	return (
		<>
			<Header course={course}/>
			<Content parts={parts} exercises = {exercises}/>
			<Total totalAmountOfExercises={totalAmountOfExercises}/>
		</>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
