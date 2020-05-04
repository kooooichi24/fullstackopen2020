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
  test('succeeds with a valid data', async () => {
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

  test('succeeds without likes of blog', async () => {
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

  test('fails with status 400 if data invalid', async () => {
    const newBlogWithoutTitleOrUrl = {
      author: '@svfreerider',
      likes: 306
    }

    await api
      .post('/api/blogs')
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

afterAll(() => {
  mongoose.connection.close()
})