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

export const EDIT_NUMBER = gql`
  mutation editNumber($name: String!, $phone: String!) {
    editNumber(name: $name, phone: $phone)  {
      name
      phone
      address {
        street
        city
      }
      id
    }
  }
`

const PERSON_DETAILS = gql `
  fragment PersonDetails on Person {
    name
    phone
    address {
      street
      city
    }
  }
`

export const ALL_PERSONS = gql `
    query {
      allPersons (phone: YES) {
      ...PersonDetails
      }
    }
    ${PERSON_DETAILS}
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

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`