import React from 'react';
import { useState } from 'react';
import './Search.css'
const Search = ({setSearch, phoneBook, setShowAll,setNotification}) => { 
  const [newSearch, setNewSearch] = useState('')

  const handleSearch = (event) =>{  
    event.preventDefault() 
    setNewSearch(event.target.value)
  }

  const handleClick =()=> {      
    const findings = phoneBook.filter(person => person.name.toLowerCase().includes(newSearch.toLocaleLowerCase()))
    
    if(findings.length > 0) {
      setShowAll(false)
      setSearch(findings) 
    }
    else{     
      const errObject = {
        name:'No Results found',
        number:''      
      }
      setShowAll(false)
      setSearch([errObject])     
      setNotification('Click on Phonebook to go back')
      setTimeout(()=>setNotification(null),5000)
    } 
    
    setNewSearch('')
  }
  return(
    <div className='search'>   
        <input value={newSearch} onChange={handleSearch}/>
        <button onClick={handleClick}>Search</button>      
    </div>
  )
}

export default Search;