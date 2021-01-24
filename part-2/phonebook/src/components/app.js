import React, {useState} from 'react'
import Contact from './contact'

const App = (props) => {

	const [persons, setPersons] = useState(props.contacts)
    const [newName, setNewName] = useState('a new name')
    const [newNumber, setNewNumber] = useState('a new phone number')
    const [filterName, searchName] = useState('');

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
                setPersons(persons.concat(contactObject));
            }
            else
                alert(newName + ' already exists');
            setNewName('');
            setNewNumber('');
        }
    }

    const checkIfExists = (props) => {
        let exists = false;
        persons.forEach(person => {
            if (person.name === props)
                exists = true;
        })
        if (exists === true)
            return 1
        else 
            return 0
    }

    const handleContactChange = (event) => {
        setNewName(event.target.value);
    }
    
    const handlePhoneChange = (event) => {
        setNewNumber(event.target.value);
    }

    const handleFilterChange = (event) => {
        searchName(event.target.value);
        // setPersons(arr.filter(value => {
        //     return value.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
        // }))
    }

	return (
		<div>
        <h2>Filter</h2>
        <form>
            <div>
                Search for contact:
            </div>
            <input
                value={filterName}
                onChange={handleFilterChange}
            />
        </form>
		<h2>Phonebook</h2>
		<form onSubmit={addContact}>
		  <div>
			Name: 
            <input 
                value={newName}
                onChange={handleContactChange}
            />
		  </div>
          <div>
              Phone number:
              <input
                value={newNumber}
                onChange={handlePhoneChange}
              />
          </div>
		  <div>
			<button type="submit">add</button>
		  </div>
		</form>
		<h2>Numbers</h2>
        <ul>
        <Contact filter={filterName} contacts={persons}/>
        </ul>
	  </div>
	)
}

export default App