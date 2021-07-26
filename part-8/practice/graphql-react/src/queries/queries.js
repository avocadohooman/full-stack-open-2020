import { gql  } from '@apollo/client'

export const CREATE_PERSON = gql`
    mutation createPerson($name: String!, $street: String!, $city: String!, $phone: String) {
    addPerson(
        name: $name,
        street: $street,
        city: $city,
        phone: $phone
    ) {
        name
        phone
        id
        address {
        street
        city
        }
    }
    }
`

export const ALL_PERSONS = gql `
  query {
    allPersons (phone: YES) {
      name
      phone
      id
    }
  }
`

export const FIND_PERSON = gql `
    query FindPersonByName($findPersonName: String!) {
        findPerson(name: $findPersonName) {
        name
        id
        phone
        address {
            street
            city
        }
    }
  }
`