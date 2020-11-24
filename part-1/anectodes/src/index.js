import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({label, onClick}) => {
	return (
		<button onClick = {onClick}>{label}</button>
	)
}

const Anectode = ({header, anectodes, index, votes}) => {

	return (
		<div>
			<h1>{header}</h1>
			<p>{anectodes[index]}</p>
			<h4>Votes: {votes[index]}</h4>
		</div>
	)
}

const App = () => {
	const [selected, setSelected] = useState(0)
	const [votes, setVote] = useState(new Array(6).fill(0))

	const nextAnectode = () => {
		const arrayIndex = Math.floor(Math.random() * (6 - 0) + 0)
		console.log(arrayIndex)
		setSelected(arrayIndex)
		showAnectodeMostVotes()
	}

	const voteAnectode = () => {
        const copy = [ ...votes]
        copy[selected] += 1
		setVote(copy)
		showAnectodeMostVotes()
	}

	const showAnectodeMostVotes = () => {
		let i = 0
		let indexMostVoted = 0
		while (i < votes.length)
		{
			if (votes[i] > votes[indexMostVoted])
			{
				indexMostVoted = i
			}
			i++
		}
		return (indexMostVoted)
	}

	return (
		<>
			<Anectode header='Selected Anectode' anectodes={anectodes} index={selected} votes={votes}/>
			<Button label = 'Vote' onClick={voteAnectode}/>
			<Button label = 'Random Anectode' onClick={nextAnectode}/>
			<Anectode header='Highest Voted Anectode' anectodes={anectodes} index={showAnectodeMostVotes()} votes={votes}/>
		</>
	)
}


const anectodes = [ 
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
	<App />, 
	document.getElementById('root')
)
