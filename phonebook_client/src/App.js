import React from "react";
import { useEffect, useState } from "react";
import personService from "./Services/Person";
import Phonebook from "./Components/PhoneBook";
import Search from "./Components/Search";
import Form from "./Components/Form";
import Notification from "./Components/Notification";
import "./App.css";

const App = () => {
  const [phoneBook, setPhoneBook] = useState([]);
  const [search, setSearch] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.getAll().then((person) => {
      setPhoneBook(person);
    });
  }, []);

  const deletePerson = (deleteme) => {
    const deleteMe = phoneBook.find((item) => item.id === deleteme.id);
    const index = phoneBook.indexOf(deleteme);
    const book = [...phoneBook];

    if (window.confirm(`Delete ${deleteMe.name} ?`)) {
      personService.deletePerson(deleteMe.id);
      //updating phonebook on frontend
      book.splice(index, 1);
      setPhoneBook(book);
      //setting deleted notification
      setNotification(`${deleteme.name} deleted!`);
      setTimeout(() => setNotification(null), 5000);
    }
  };

  const nameToShow = showAll ? phoneBook : search;

  // const showall = () => {
  //   setShowAll(true);
  //   setSearch([]);
  // };
  return (
    <div className="phonebook">
      <h1 onClick={()=>{
        setShowAll(true)
        setSearch([])
        }
      }>PhoneBook</h1>
      <div className="searchBar">
        <Search
          setSearch={setSearch}
          phoneBook={phoneBook}
          setShowAll={setShowAll}
          setNotification={setNotification}
        />
      </div>
      <Notification message={notification} />
      <div>
        <div className="person-list">
          {nameToShow ? (
            nameToShow.map((item) => {
              return (
                <Phonebook
                  key={item.id}
                  person={item}
                  onClick={() => {
                    deletePerson(item);
                  }}
                />
              );
            })
          ) : (
            <></>
          )}
        </div>
        {search.length === 0 ? (
          <Form
            phoneBook={phoneBook}
            setPhoneBook={setPhoneBook}
            setNotification={setNotification}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default App;
