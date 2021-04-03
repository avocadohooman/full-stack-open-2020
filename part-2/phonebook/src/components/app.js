import React, {useState, useEffect} from 'react';
import Contact from './contact';
import Filter from './filter';
import ContactForm from './contactform';
import axios from 'axios';
import api from '../services/api';
const App = (props) => {

	const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('a new name')
    const [newNumber, setNewNumber] = useState('a new phone number')
    const [filterName, searchName] = useState('');

    const dataHook = () => {
        console.log('effect');
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled', response.data);
                setPersons(response.data);
            })
    }

    useEffect(dataHook, []);

    const addContact = (event) => {
        event.preventDefault();
        console.log('button clicked', event.target);

        if (newName === '')
            alert('The name must be at least one character long')
        else {
            if (!checkIfExists(newName))
            {
                const contactObject = {
                    id: persons.length + 1,
                    name: newName,
                    phoneNumber: newNumber,
                }
                api
                    .addContact()
                    .then(response => {
                        setPersons(persons.concat(response.data))
                    })
            //    setPersons(persons.concat(contactObject));
            }
            else
                alert(newName + ' already exists');
            setNewName('');
            setNewNumber('');
        }
    }

    const checkIfExists = (props) => {
        let exists = false;
        persons?.forEach(person => {
            if (person.name?.toLowerCase() === props.toLowerCase())
                exists = true;
        })
        if (exists === true)
            return 1
        else 
            return 0
    }

    const handleContactChange = (event) => setNewName(event.target.value);
    
    const handlePhoneChange = (event) => setNewNumber(event.target.value);

    const handleFilterChange = (event) => searchName(event.target.value);

	return (
		<div>
        <h2>Filter</h2>
            <Filter text="Search for contact: " filter={filterName} onChanges={handleFilterChange}/>
		<h2>Phonebook</h2>
            <ContactForm addContact={addContact} 
                newName={newName} 
                newNumber={newNumber} 
                handleContactChange={handleContactChange} 
                handlePhoneChange={handlePhoneChange}/>
		<h2>Numbers</h2>
        <ul>
            { persons.length > 0 && <Contact filter={filterName} contacts={persons}/>}
        </ul>
	  </div>
	)
}

export default App