import { useState } from 'react'

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

  const addContact = (event) => {
    
    event.preventDefault()

    for (const person of props.persons) {
      if (person.name === props.newName) {
        alert(`${props.newName} is already added to phonebook`);
        return;
      }
    }

    const personObject = {
      name: props.newName,
      number: props.newNumber
    }

    props.setPersons(props.persons.concat(personObject))
    props.setNewName('')
    props.setNewNumber('')
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
  return (
    <>{props.person.name} {props.person.number}<br /></>
  )
}

const Persons = (props) => {
  return (
    <>
      {props.persons.filter(person => person.name.includes(props.filter)).map(person =>
        <Person key={person.name} person={person} />
      )}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
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
      <Persons persons={persons} filter={newFilter} />
    </div>
  )
}

export default App
