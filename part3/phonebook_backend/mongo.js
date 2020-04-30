const mongoose = require('mongoose')

if (process.argv.length < 5) {
  console.log('Insufficient arguments')
  console.log('please enter: "node mongo.js yourpassword name number"')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
const url = `mongodb+srv://kooooichi24:${password}@cluster0-xkbv6.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  number: number,
})

// create person
person.save().then(response => {
  console.log(`added ${name} number ${number} to phonebook`)
  mongoose.connection.close()
})

// get person
Person.find({}).then(persons => {
  console.log('phonebook:')
  persons.forEach(person => {
    console.log(`${person.name} ${person.number}`)
  })
  mongoose.connection.close()
})