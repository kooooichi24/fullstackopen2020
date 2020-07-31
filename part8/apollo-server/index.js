const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Person = require('./models/person')
const { v1: uuid } = require('uuid')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb+srv://fullstack:halfstack@cluster0-ostce.mongodb.net/gql-phonebook?retryWrites=true'

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
    type Address {
        street: String!
        city: String!
    }

    type Person {
        name: String!
        phone: String
        address: Address!
        id: ID!
    }

    enum YesNo {
        YES
        NO
    }

    type Query {
        personCount: Int!
        allPersons(phone: YesNo): [Person!]!
        findPerson(name: String!): Person
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
    findPerson: (root, args) => Person.findOne({ name: args.name })
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
    addPerson: (root, args) => {
      const person = new Person({ ...args })
      return person.save()
    },
    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name })
      person.phone = args.phone
      return person.save()
    }
  }
}

// Create an instance of ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})