import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({header}) => {

	return (
		<>
			<h1>
				{header}
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

const Part = ({part}) => {
	console.log('Test', part.name)
	return (
		<>
			<h3>{part.name}</h3>

			<p>Number of Exercises: {part.exercises}</p>
		</>
	)
}

const Total = (props) => {

	return (
		<h2>Total amount of Exercises: {props.totalAmountOfExercises}</h2>
	)
}

const Course = ({courses}) => {

	return (
		<>
			{courses.map((course) => (<Header key={course.id} header={course.name}/>))}
			{courses.map((course) => <Part key={course.id} part={course.parts}/>)}
			{/* <Content parts = {courses}/>
			<Total totalAmountOfExercises={courses.reduce((sum, courses) => sum += courses.exercise, 0)}/> */}
		</>
	)
}

const App = () => {
	const courses = [
		{
		  name: 'Half Stack application development',
		  id: 1,
		  parts: [
			{
			  name: 'Fundamentals of React',
			  exercises: 10,
			  id: 1
			},
			{
			  name: 'Using props to pass data',
			  exercises: 7,
			  id: 2
			},
			{
			  name: 'State of a component',
			  exercises: 14,
			  id: 3
			},
			{
			  name: 'Redux',
			  exercises: 11,
			  id: 4
			}
		  ]
		}, 
		{
		  name: 'Node.js',
		  id: 2,
		  parts: [
			{
			  name: 'Routing',
			  exercises: 3,
			  id: 1
			},
			{
			  name: 'Middlewares',
			  exercises: 7,
			  id: 2
			}
		  ]
		}
	  ]

	return (
		<div>
			<Course courses={courses}/>
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
