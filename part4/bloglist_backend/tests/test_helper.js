const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'eslint-config-airbnbの導入',
    author: '@bohebohechan',
    url: 'https://qiita.com/bohebohechan/items/0332b557f80150e714de',
    likes: 32
  },
  {
    title: 'javaプログラマー向け学習のための本（新人から５年めくらいまで）を考えてみた',
    author: '@bonybeat',
    url: 'https://qiita.com/bohebohechan/items/0332b557f80150e714de',
    likes: 1102
  },
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb
}