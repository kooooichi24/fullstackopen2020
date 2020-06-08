const { totalLikes } = require('../utils/list_helper')

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]
  const listWithBiggerBlogs = [
    {
      _id: '5eac4529fe1a1f51d15a365c',
      title: 'eslint-config-airbnbの導入',
      author: '@bohebohechan',
      url: 'https://qiita.com/bohebohechan/items/0332b557f80150e714de',
      likes: 32,
      __v: 0
    },
    {
      _id: '5eac4541fe1a1f51d15a365d',
      title: 'javaプログラマー向け学習のための本（新人から５年めくらいまで）を考えてみた',
      author: '@bonybeat',
      url: 'https://qiita.com/bohebohechan/items/0332b557f80150e714de',
      likes: 1102,
      __v: 0
    },
    {
      _id: '5eac4573fe1a1f51d15a365e',
      title: 'React patterns',
      autho: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    },
    {
      _id: '5eac45bcfe1a1f51d15a365f',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('of empty list is zero', () => {
    const result = totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = totalLikes(listWithBiggerBlogs)
    expect(result).toBe(1146)
  })

  test
})