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
        author: String!
        published: Int!
        genres: [String!]!
        id: String!
    }

    type Author {
        name: String!
        born: Int
        id: String!
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

const addAuthor = (authorName) => {
  const author = {
    name: authorName,
    id: uuid(),
    bookCount: 1
  }
  authors = authors.concat(author)
}

// resolver
const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    // allBooks: (root, args) => {
    //     if (!args.author && !args.genre) {
    //         return books
    //     }

    //     if (args.author && !args.genre) {
    //         return books.filter(book => book.author.includes(args.author))
    //     } 
    //     if (!args.author && args.genre) {
    //         return books.filter(book => book.genres.includes(args.genre))
    //     }
    //     if (args.author && args.genre) {
    //         return books.filter(book => book.author.includes(args.author) && book.genres.includes(args.genre))
    //     }
    // },
    // allAuthors: () => authors
  },
  // Author: {
  //     bookCount: (root) => {
  //         return books.filter(book => book.author === root.name).length
  //     }
  // },
  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.author })
      if (!author) {
        const newAuthor = new Author({ name: args.author })
        newAuthor.save()
      }
      
      const book = new Book({
        title: args.title,
        published: args.published,
        author: author,
        genre: args.genre
      })
      book.save()
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