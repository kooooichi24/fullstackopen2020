import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('blog default visibility', () => {
  const blog = {
    title: 'aa',
    author: 'aaa',
    url: 'aaaa',
    likes: 5
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent('likes')
})