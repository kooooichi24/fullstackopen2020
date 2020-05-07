const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)

const userScheme = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    require: true,
    unique: true
  },
  name: String,
  passwordHash: {
    type: String,
    minlength: 3,
    required: true
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userScheme.plugin(uniqueValidator)

userScheme.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be reveal
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userScheme)

module.exports = User