const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const newObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = newObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

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

test('a valid blog can be added', async () => {
  const newBlog = {
    title: '個人開発で100ヵ国以上が参加するトーナメントで世界1位を獲るまで',
    author: '@svfreerider',
    url: 'https://qiita.com/svfreerider/items/c18edac0e93ed86c55bf',
    likes: 306
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})

test('blog without likes can be added', async () => {
  const newBlogWithoutLike = {
    title: '個人開発で100ヵ国以上が参加するトーナメントで世界1位を獲るまで',
    author: '@svfreerider',
    url: 'https://qiita.com/svfreerider/items/c18edac0e93ed86c55bf'
  }

  const savedBlog = await api
    .post('/api/blogs')
    .send(newBlogWithoutLike)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(savedBlog.body.likes).toBe(0)
})

afterAll(() => {
  mongoose.connection.close()
})