import React from 'react'


const Contact = ({filter, contacts, deleteContact}) => {

    return (
        <div>
            {contacts.filter(contact => 
                contact.name?.toLowerCase().includes(filter.toLowerCase()))
                .map(contact =>
                    <li key={contact.id}>
                        {contact.name}, {contact.phoneNumber}
                        <button value={contact.id} onClick={((e) => deleteContact(e, contact.id))}>Delete</button>
                    </li>
            )
            }
        </div>
    )

}

export default Contact