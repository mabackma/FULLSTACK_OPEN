import { useState, useEffect } from 'react'
import personService from './services/persons'
import persons from './services/persons';

const Filter = (props) => {
  const handleFilterChange = (event) => {
    props.setFilter(event.target.value);
  };

  return (
    <>
      filter shown with <input value={props.filter} onChange={handleFilterChange} />
    </>
  );
}

const PersonForm = (props) => {
  const handleNameChange = (event) => {
    props.setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    props.setNewNumber(event.target.value)
  }

  // Adds contact
  const addContact = (event) => {
    event.preventDefault()

    // Checks phonebook for duplicates
    for (const person of props.persons) {
      if (person.name === props.newName) {
        const confirmed = window.confirm(`${props.newName} is already added to phonebook, replace the old number with a new one?`)
        
        // Updates phonenumber of duplicate
        if(confirmed) {
          const changedPerson = { ...person, number: props.newNumber }

          personService
            .update(person.id, changedPerson)
            .then(returnedPerson => {
              // Updated the array with the changed person
              const updatedPersons = props.persons.map(p => p.id !== person.id ? p : returnedPerson)

              // Update the state
              props.setPersons(updatedPersons)
            })
        }

        return
      }
    }

    const personObject = {
      name: props.newName,
      number: props.newNumber
    }

    personService
    .create(personObject)
    .then(returnedPerson => {
      props.setPersons(props.persons.concat(returnedPerson))
      props.setNewName('')
      props.setNewNumber('')
    })
  }

  return (
    <>
      <form onSubmit={addContact}>
        <div>
          name: <input value={props.newName} onChange={handleNameChange}/>
          <br/>
          number: <input value={props.newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const Person = (props) => {

  // Removes contact
  const removeContact = (event) => {
    event.preventDefault()

    const confirmed = window.confirm(`Delete ${props.person.name} ?`)
      if(confirmed) {
        personService
        .remove(props.person.id)
        .then(response => {
          // Filter out the deleted person from the array
          const updatedPersons = props.persons.filter(person => person.id !== props.person.id)
  
          // Update the state
          props.setPersons(updatedPersons)
      })
    }
  }

  return (
    <>
      {props.person.name} {props.person.number}
      <button onClick={removeContact}>delete</button>
      <br />
    </>
  )
}

const Persons = (props) => {
  return (
    <>
      {props.persons.filter(person => person.name.includes(props.filter)).map(person =>
        <Person key={person.name} person={person} persons={props.persons} setPersons={props.setPersons} />
      )}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  // Get persons from db.json
  useEffect(() => {
    personService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} setFilter={setNewFilter} />
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} 
        newName={newName} setNewName={setNewName} 
        newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} filter={newFilter} />
    </div>
  )
}

export default App
