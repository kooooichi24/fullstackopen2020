const { dummy } = require('../utils/list_helper')

test('dummy return one', () => {
  const blogs = []

  const result = dummy(blogs)
  expect(result).toBe(1)
})