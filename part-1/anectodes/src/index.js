import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({label, onClick}) => {
	return (
		<button onClick = {onClick}>{label}</button>
	)
}

const App = () => {
	const [selected, setSelected] = useState(anectodes[0])
	const [votes, setVote] = useState(new Array(6).fill(0))

	const nextAnectode = () => {
		const arrayIndex = Math.floor(Math.random() * (6 - 0) + 0)
		console.log(arrayIndex)
		setSelected(anectodes[arrayIndex])
	}

	const vote = () => {
        const copy = [ ...votes]
        copy[selected] += 1
        setVote(copy)
	}

	return (
		<>
			<p>{selected}</p>
			<p>{votes}</p>
			<Button label = 'Vote' onClick={vote}/>
			<Button label = 'Random Anectode' onClick={nextAnectode}/>
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
