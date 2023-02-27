import React from "react";
import { useState } from "react";
import Person from "../Services/Person";
import "./Form.css";
const Form = ({ phoneBook, setPhoneBook, setNotification }) => {
  const [newName, setNewName] = useState([]);
  const [newNumber, setNewNumber] = useState([]);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString(),
    };
    if (phoneBook !== "") {
      const personExists = phoneBook.find((person) => {
        return person.name.toLowerCase() === newName.toLowerCase()
      });

      if (personExists) {
        if ( window.confirm(
            "Person already exist. Do you want to replace the old number with new one?"
        )) {
          Person.updatePerson(personExists.id, personObject)
          .then((updatedBook) => {                         
             const book = phoneBook.map((person) => {
               return person.id !== personExists.id ? person : updatedBook })
                     
            setNotification(`${personObject.name} updated!`)
            setTimeout(()=> setNotification(null),5000)
            setPhoneBook(book);
            setNewName("");
            setNewNumber("");
          })
        }
      } else {
        Person.addPerson(personObject)
          .then((addedPerson) => {
            setPhoneBook(phoneBook.concat(addedPerson));
            setNewName("");
            setNewNumber("");
            setNotification(`${personObject.name } added!`)
            setTimeout(()=> setNotification(null),5000)
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const handleNameInput = (event) => {    
    setNewName(event.target.value);
  };

  const handleNumberInput = (event) => {  
      setNewNumber(event.target.value);
  };
  
  return (
    <div className="personForm">
      <form onSubmit={addPerson}>
        <div>
          Name <input type='text' value={newName} onChange={handleNameInput} required />
        </div>
        <div>
          Number{" "}
          <input type='number' value={newNumber} onChange={handleNumberInput} required />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Form;
