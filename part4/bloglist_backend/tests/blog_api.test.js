const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})

  const newObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = newObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('when there is initially some blogs saved', () => {
  test('all blogs are returned', async () => {
    const res = await api.get('/api/blogs')

    expect(res.body).toHaveLength(helper.initialBlogs.length)
  })

  test('is identify property id?', async () => {
    const blogs = await helper.blogsInDb()

    blogs.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('addition of a new blog', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('succeeds with a valid data', async () => {
    const newBlog = {
      title: 'IT系の会社に入った新入社員の皆さんへのアドバイスを、ひとつだけ',
      author: '@ishida330',
      url: 'https://qiita.com/ishida330/items/149d93b9690eb61d0e05',
      likes: 1533
    }

    const loginResult = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' })

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${loginResult.body.token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('succeeds without likes of blog', async () => {
    const newBlogWithoutLike = {
      title: 'IT系の会社に入った新入社員の皆さんへのアドバイスを、ひとつだけ',
      author: '@ishida330',
      url: 'https://qiita.com/ishida330/items/149d93b9690eb61d0e05'
    }
    const loginResult = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' })

    const savedBlog = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${loginResult.body.token}`)
      .send(newBlogWithoutLike)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(savedBlog.body.likes).toBe(0)
  })

  test('fails with status 400 if data invalid', async () => {
    const newBlogWithoutTitleOrUrl = {
      author: '@svfreerider',
      likes: 306
    }
    const loginResult = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' })

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${loginResult.body.token}`)
      .send(newBlogWithoutTitleOrUrl)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
  })
})

describe('update of a blog', () => {
  test('succeeds with update likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogsToUpdate = blogsAtStart[0]
    blogsToUpdate.likes += 1

    const resultBlog = await api
      .put(`/api/blogs/${blogsToUpdate.id}`)
      .send(blogsToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body.likes).toBe(blogsToUpdate.likes)
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const userAtStart = await helper.usersInDb()

    const newUser = {
      username: 'koichi Furukwa',
      name: 'kooooichi24',
      password: 'password'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const userAtEnd = await helper.usersInDb()
    expect(userAtEnd).toHaveLength(userAtStart.length + 1)

    const usernames = userAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'rt',
      password: 'rtrt'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')
  })

  test('creation fails with proper statuscode and message if username shoter', async () => {
    const userAtStart = await helper.usersInDb()

    const shoterUser = {
      username: 'r',
      password: 'r'
    }

    const result = await api
      .post('/api/users')
      .send(shoterUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('is shorter')
  })
})

afterAll(() => {
  mongoose.connection.close()
})