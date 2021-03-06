require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const Person = require('./models/person')

const cors = require('cors')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())


morgan.token('body', (req, res) => {
  const body = req.body
  return JSON.stringify(body)
})
const loggerFormat = ':method :url :status :res[content-length] - :response-time ms :body'
app.use(morgan(loggerFormat))


app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(p => p.toJSON()))
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.get('/api/info', (req, res) => {
  Person.find({}).then(persons => {
    const message = `
      <p>Phonebook has info for ${persons.length} peaple</p>
      <p>${new Date()}</p>
    `
    res.send(message)
  })
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person
    .save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => res.json(savedAndFormattedPerson))
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
// handler of requests with unknown endpoint
app.use(unknownEndPoint)

const errorHandler = (error, req, res, next) => {
  console.log(error.message)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message })
  }
  next(error)
}
// handler of requests with result to errors
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`http://localhost:${PORT}`)
})