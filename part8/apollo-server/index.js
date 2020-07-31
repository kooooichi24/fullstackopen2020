const { ApolloServer, UserInputError, gql } = require('apollo-server')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const Person = require('./models/person')
const User = require('./models/user')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const MONGODB_URI = 'mongodb+srv://fullstack:halfstack@cluster0-ostce.mongodb.net/gql-phonebook?retryWrites=true'

const JWT_SECRET = 'SECRET_KEY'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((err) => {
    console.log('error connecting to MongoDB:', err.message)
  })

// define GraphQL schema
const typeDefs = gql` 
  type User {
    username: String!
    friends: [Person!]!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type Address {
    street: String!
    city: String!
  }

  enum YesNo {
    YES
    NO
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
    me: User
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(
      name: String!
      phone: String!
    ): Person
    createUser(
      username: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

// resolver
const resolvers = {
  Query: {
    personCount: () => Person.collection.countDocuments(),
    allPersons: (root, args) => {
      if (!args.phone) {
        return Person.find({})
      }

      return Person.find({ phone: { $exists: args.phone === 'YES' }})
    },
    findPerson: (root, args) => Person.findOne({ name: args.name }),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city
      }
    }
  },
  Mutation: {
    addPerson: async (root, args) => {
      const person = new Person({ ...args })

      try {
        await person.save() 
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        })
      }
      return person
    },
    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name })
      person.phone = args.phone

      try {
        await person.save()
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args
        })
      }
      return person
    },
    createUser: (root, args) => {
      const user = new User({ username: args.name })

      return user.save()
        .catch(err => {
          throw new UserInputError(err.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secred' ) {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: args.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  }
}

// Create an instance of ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), jWT_SECRET)
      const currentUser = await User.findById(decodedToken.id).populate('friends')
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})