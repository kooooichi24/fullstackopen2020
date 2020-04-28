const express = require('express')
const cors = require('cors')
const app = express()
const morgan = require('morgan')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.token('body', (req, res) => {
  const body = req.body
  return JSON.stringify(body)
});
const loggerFormat = ':method :url :status :res[content-length] - :response-time ms :body'
app.use(morgan(loggerFormat))

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

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)

  res.status(204).end()
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(p => p.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', (req, res) => {
  const body = req.body
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name of number missing'
    })
  }
  
  const existing = persons.find(p => p.name === body.name)
  console.log("existing", existing)
  if (existing) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }
  persons = persons.concat(person)
  console.log(persons)
  res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`http://localhost:${PORT}`)
})