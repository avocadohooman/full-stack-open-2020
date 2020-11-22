import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({label, onClick}) => {

	return (
		<button onClick = {onClick}>{label}</button>
	)
}

const Statistics = ({feedback}) => {

	return (
		<div>
			<h1>Feedback Statistics</h1>
			<p>Good: {feedback.good} </p>
			<p>Neutral: {feedback.neutral} </p>
			<p>Bad: {feedback.bad} </p>
		</div>
	)
}


const App = () => {

	const [feedback, setFeedback] = useState({
		good: 0,
		neutral: 0,
		bad: 0
	})

	const goodFeedback = () => {
		setFeedback({...feedback, good: feedback.good += 1})
	}
	
	const neutraleedback = () => {
		setFeedback({...feedback, neutral: feedback.neutral += 1})
	}
	
	const badFeedback = () => {
		setFeedback({...feedback, bad: feedback.bad += 1})
	}	

	return (
		<>
			<h1>Give Feedback</h1>
			<Button label ="Good" onClick={goodFeedback}/>
			<Button label ="Neutral" onClick={neutraleedback}/>
			<Button label ="Bad" onClick={badFeedback}/>
			<Statistics feedback={feedback}/>
		</>
	)
}

ReactDOM.render(
	<App />, 
	document.getElementById('root')
  )
