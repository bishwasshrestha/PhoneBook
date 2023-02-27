const express = require("express");
const app = express();
const db = require("./Persons.json");
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT;

//Middlewares
app.use(express.static("build"));
app.use(cors());
const morgan = require("morgan");

morgan.token("body", (req) => {
  const body = {
    name: req.body.name,
    number: req.body.number,
  };
  const bodyString = JSON.stringify(body);
  return bodyString;
});

app.use(
  morgan(
    ":method :url :status :res[content-length] :response-time ms :referrer :body"
  )
);

app.use(express.json());

//http requests

app.get("/api/persons/", (req, res) => {
  console.log(db.Persons);
  res.json(db.Persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = db.Persons.find((n) => n.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end("404 Not Found!");
  }
});

app.get("/", (req, res) => {
  const time = new Date();
  console.log(time);
  const response = `<div>
    <h1>PhoneBook has info for ${db.Persons.length} people</h1>
    <h3>${time}</h3>
  </div>`;
  res.send(response);
});

const generateId = () => {
  const maxId =
    db.Persons.length > 0 ? Math.max(...db.Persons.map((item) => item.id)) : 0;

  // const id = Math.floor(Math.random()* 100)
  // if(id < maxId){
  //   generateId()
  // }else{
  //   return id
  // }
  return maxId + 1;
};

app.post("/api/persons", (req, res) => {
  const body = req.body;
  console.log(body);
  if (!body.name || !body.number) {
    res.status(401).send({ error: "Info missing" });
  } else if (db.Persons.find((person) => person.name === req.body.name)) {
    res.status(401).send({ error: "name already exists" });
  } else {
    const personObject = {
      id: generateId(),
      name: body.name,
      number: body.number,
    };

    db.Persons.push(personObject);
    res.json(personObject);
  }
});

app.put("/api/persons/:id", (req, res) => {
  const newInfo = req.body;
  const persons = [...db.Persons];
  const id = Number(req.params.id);
  const updatedPerson = {
    id: id,
    name: newInfo.name,
    number: newInfo.number,
  };
  //need to update the current info in given id with new info given on req.body
  db.Persons = persons.map((person) => {
    return person.id !== id ? person : updatedPerson;
  });

  res.send(updatedPerson);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = db.Persons.find((person) => person.id === id);
  const index = db.Persons.indexOf(person);
  if (person) {
    db.Persons.splice(index, 1);
  } else {
    res.status(404).end("Person not found!");
  }
  res.status(200).end("delete successful!");
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
