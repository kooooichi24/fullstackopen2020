const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const JWT_SECRET = 'SECRET_KEY'

const password = process.argv[2]
const MONGODB_URI = `mongodb+srv://kooooichi24:${password}@cluster0-xkbv6.mongodb.net/library-app?retryWrites=true`

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
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

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
    me: User
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const addAuthor = async (args) => {
  const newAuthor = new Author({ name: args.author })

  try {
    await newAuthor.save()
  } catch (err) {
    throw new UserInputError(err.message, {
      invalidArgs: args
    })
  }
  
  return newAuthor
}

// resolver
const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate('author')
      }
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      return await Book.collection.countDocuments({ author: root._id })
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = await addAuthor(args)
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        author: author,
        genres: args.genres
      })

      try {
        await book.save()
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        })
      }
      
      return book
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      
      let updatedAuthor
      try {
        updatedAuthor = await Author.findOneAndUpdate(
          { name: args.name },
          { $set: { born: args.setBornTo } },
          { "new": true }
        )
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args
        })
      }    
      
      return updatedAuthor
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      
      return user.save()
        .catch(err => {
          throw new UserInputError(err.message, {
            invalidArgs: args
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secred') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: args.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}

// Create an instance of ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})