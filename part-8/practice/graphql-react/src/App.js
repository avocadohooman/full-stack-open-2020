import React, {useState} from 'react';
import { gql, useQuery, useApolloClient } from '@apollo/client';
import Persons  from './components/Persons';
import PersonForm from './components/PersonForm';
import { ALL_PERSONS } from './queries/queries';
import PhoneForm from './components/PhoneForm';
import LoginForm from './components/LoginForm';

const App = () => {
  const result = useQuery(ALL_PERSONS);
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState('');
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>login</h2>
        <LoginForm 
          setToken={setToken}
          setError={setErrorMessage}
        />
      </div>
    )
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  }
  
  return (
    <div>
       <button onClick={logout}>
        logout
      </button>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify}/>
      <PhoneForm setError={notify}/>
    </div>
  );
}

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
    {errorMessage}
    </div>
  )
}

export default App;
