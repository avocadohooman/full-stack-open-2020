import React from 'react'


const ContactForm = ({addContact, newName, newNumber, handleContactChange, handlePhoneChange}) => {
    return (
        <>
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
        </>
    )
}


export default ContactForm