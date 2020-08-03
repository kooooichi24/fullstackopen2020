const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const MONGODB_URI = 'mongodb+srv://fullstack:halfstack@cluster0-ostce.mongodb.net/gql-phonebook?retryWrites=true'

console.log('connecting to ', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(err => {
    console.log('error connecting to MongoDB: ', err.message)
  })

// define GraphQL schema
const typeDefs = gql`
    type Book {
        title: String!
        author: Author!
        published: Int!
        genres: [String!]!
        id: ID!
    }

    type Author {
        name: String!
        born: Int
        id: ID!
        bookCount: Int!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
    }
`

const addAuthor = async (authorName) => {
  const newAuthor = new Author({ name: authorName })
  await newAuthor.save()
  return newAuthor
}

// resolver
const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({})
      }

      // if (args.author && !args.genre) {
      //     return books.filter(book => book.author.includes(args.author))
      // } 
      // if (!args.author && args.genre) {
      //     return books.filter(book => book.genres.includes(args.genre))
      // }
      // if (args.author && args.genre) {
      //     return books.filter(book => book.author.includes(args.author) && book.genres.includes(args.genre))
      // }
    },
    allAuthors: () => Author.find({})
  },
  Author: {
    bookCount: async (root) => {
      return await Book.collection.countDocuments({ author: root._id })
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.author })
      if (!author) {
        author = addAuthor(args.author)
      }

      console.log('author: ', author);

      const book = new Book({
        title: args.title,
        published: args.published,
        author: author,
        genres: args.genres
      })

      await book.save()
      return book
    },
    //     editAuthor: (root, args) => {
    //         const author = authors.find(a => a.name === args.name)
    //         if (!author) {
    //             return null
    //         }

    //         const updatedAuthor = { ...author, born: args.setBornTo }
    //         authors = authors.map(a => a.id === updatedAuthor.id ? updatedAuthor : a)
    //         return updatedAuthor
    //     }
  }
}

// Create an instance of ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})