import React from 'react';
import './PhoneBook.css'

const PhoneBook = ({person, onClick}) =>{
  
  return (
    <div className='persons'>
      <li>{person.name}</li>
      <li>{person.number}</li>
       {(person.number) ?
        <button onClick={onClick}>delete</button>
        : <></>
        }
     </div>          
  )
}
export default PhoneBook;