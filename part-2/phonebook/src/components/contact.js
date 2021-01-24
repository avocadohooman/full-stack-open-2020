import React from 'react'


const Contact = ({filter, contacts}) => {

    return (
        <div>
            {contacts.filter(contact => 
                contact.name.toLowerCase().includes(filter.toLowerCase()))
                .map(contact =>
                    <li key={contact.id}>
                        {contact.name}, {contact.phoneNumber}
                    </li>
            )
            }
        </div>
    )

}

export default Contact