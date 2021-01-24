import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'

const contacts = [
    {
        id: 1,
        name: 'Gerhard Molin',
        phoneNumber: '+358 45 220 3414'
    },
    {
        id: 2,
        name: 'Eric Schmidt',
        phoneNumber: '+1 45 220 3414'
    },
    {
        id: 3,
        name: 'Lerry Page',
        phoneNumber: '+1 46 221 3414'
    },
    {
        id: 4,
        name: 'Steve Jobs',
        phoneNumber: '+1 42 100 3214'
    }
]

ReactDOM.render(
	<App contacts = {contacts}/>,
	document.getElementById('root')
)