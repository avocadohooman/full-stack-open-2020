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

const Content = ({parts}) => {

	return (
		<>
			{parts.map((part) => (<Part key={part.id} part={part}/>))}
			<Total total={parts.reduce((sum, parts) => sum += parts.exercises, 0)}/>
		</>
	)
}

const Part = ({part}) => {
	return (
		<>
			<h3>{part.name}</h3>
			<p>Number of Exercises: {part.exercises}</p>
		</>
	)
}

const Total = ({total}) => {

	return (
		<h2>Total amount of Exercises: {total}</h2>
	)
}

const Course = ({course}) => {
	return (
		<>
			<Header header={course.name}/>
			<Content parts = {course.parts}/>
		</>
	)
}


export default Course