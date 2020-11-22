import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({label, onClick}) => {

	return (
		<button onClick = {onClick}>{label}</button>
	)
}

const Statistic = ({label, value}) => {

	if (label === 'Positive') {
		return (
			<p>{label}: {value}% </p>
		)
	} else {
		return (
			<p>{label}: {value} </p>
		)
	}
}

const Statistics = ({feedback}) => {

	const all = feedback.good + feedback.neutral + feedback.bad
	const average = (feedback.good * 1 + feedback.neutral * 0 + feedback.bad * -1) / 3
	const positive = Math.floor((feedback.good / all) * 100)
	const goodFeedback = feedback.good
	const neutralFeedback = feedback.neutral
	const badFeedback = feedback.bad

	if (all === 0) {
		return (
			<p>No feedback given</p>
		)
	} 
	else {
		return (
			<div>
				<Statistic label="Good" value={goodFeedback}/>
				<Statistic label="Neutral" value={neutralFeedback}/>
				<Statistic label="Bad" value={badFeedback}/>
				<Statistic label="All" value={all}/>
				<Statistic label="Average" value={average}/>
				<Statistic label="Positive" value={positive}/>
			</div>
		)
	}
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
