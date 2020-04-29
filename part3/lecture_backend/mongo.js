const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://kooooichi24:${password}@cluster0-xkbv6.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url,  { useNewUrlParser: true, useUnifiedTopology: true })

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is easy',
  date: new Date(),
  important: true,
})

// get note
Note.find({ important: true }).then(result => {
  result.forEach(note => {
    console.log(note);
  })
  mongoose.connection.close()
})

// create note
// note.save().then(response => {
//   console.log('note saved')
//   mongoose.connection.close()
// })