import React, {useEffect, useState} from 'react';
import { gql, useMutation } from '@apollo/client';
import { ALL_PERSONS, CREATE_PERSON, EDIT_NUMBER} from '../queries/queries';

const PhoneForm = ({ setError }) => {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');


    const [changeNumber, result] = useMutation(EDIT_NUMBER, {
      refetchQueries: [{query: ALL_PERSONS}],
      onError: (error) => {
        setError(error.graphQLErrors[0].message);
      }
    });

    const submit = (event) => {
        event.preventDefault();
        changeNumber({ variables: {name, phone}});
        setName('');
        setPhone('');
    }

    useEffect(() => {
        if (result.data && result.data.editNumber === null) {
            setError('person not found');
        }
    }, [result.data])

    return (
        <div>
        <h2>change number</h2>
        <form onSubmit={submit}>
          <div>
            name <input value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </div>
          <div>
            phone <input value={phone}
              onChange={({ target }) => setPhone(target.value)}
            />
          </div>
          <button type='submit'>change number</button>
        </form>
      </div>
    )
}

export default PhoneForm;