const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item
  }
  return blogs.length === 0
    ? 0
    : blogs.map(blog => blog.likes).reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  blogs = blogs.map(blog => {
    delete blog._id
    delete blog.__v
    delete blog.url
    return blog
  })
  const reducer = (max, item) => {
    return max.likes > item.likes ? max : item
  }
  return blogs.length === 0
    ? []
    : blogs.reduce(reducer, 0)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}