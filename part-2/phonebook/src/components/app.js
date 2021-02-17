import React, {useState, useEffect} from 'react';
import Contact from './contact';
import Filter from './filter';
import ContactForm from './contactform';
import api from '../services/api';

const App = (props) => {

	const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('a new name')
    const [newNumber, setNewNumber] = useState('a new phone number')
    const [filterName, searchName] = useState('');

    const dataHook = () => {
        console.log('effect');
        api
            .getAll()
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
            const contactObject = {
                id: Math.floor(Math.random()),
                name: newName,
                phoneNumber: newNumber,
            }
            if (!checkIfExists(contactObject))
            {
                api
                    .addContact(contactObject)
                    .then(response => {
                        console.log('POST Promise fulfilled', response.data);
                        setPersons(persons.concat(response.data))
                    })
                // setPersons(persons.concat(contactObject));
            }
            // else
            //     alert(newName + ' already exists');
            setNewName('');
            setNewNumber('');
        }
    }

    const checkIfExists = (props) => {
        let update = false;
        let exists = false;
        persons.forEach(person => {
            if (person.name?.toLowerCase() === props.name.toLowerCase()) {
                exists = true;
                if (updateContact(person.id))
                    update = true;
            }
        })
        console.log("UPDATE && EXISTS", update, exists);
        if (update === true)
            return 1
        else if (exists === true && update === false)
            return 1
        else 
            return 0
    }

    const updateContact = (existingId) => {
        if (window.confirm(`${newName} is already in the phonebook, replace old number with new one?`)) {
            const contactObject = {
                name: newName,
                phoneNumber: newNumber,
                id: existingId
            }
            api
                .updateContact(existingId, contactObject)
                .then(response => {
                    console.log('PUT promise fulfilled', response.data);
                    dataHook();
                })
            return 1
        } else {
            return 0
        }

    }

    const deleteContact = (event, data) => {
		event.preventDefault()
        console.log('button clicked', event.target)
        if (window.confirm('Are you sure you want to delete the contact?')) {
            api
            .deleteContact(data)
            .then (response => {
                console.log("DELETE promise fulfilled", response.data);
                dataHook()
            })
        }
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
            <Contact filter={filterName} contacts={persons} deleteContact={deleteContact}/>
        </ul>
	  </div>
	)
}

export default App