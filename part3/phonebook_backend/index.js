const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Phonebook backend app</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
  console.log(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    res.json(person)
  } else {
    console.log("can't get person")
    res.status(404).end()
  }
})

app.get('/api/info', (req, res) => {
  const message = `
    <p>Phonebook has info for ${persons.length} peaple</p>
    <p>${new Date()}</p>
  `
  res.send(message)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`http://localhost:${PORT}`)
})