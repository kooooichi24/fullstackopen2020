import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('blog default visibility', () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 5
  }

  const component = render(
    <Blog blog={blog} />
  )

  const div = component.container.querySelector('.viewInfo')
  expect(div).toHaveStyle('display: none')
})