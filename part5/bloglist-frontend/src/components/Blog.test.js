import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog test', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'title',
      author: 'author',
      url: 'url',
      likes: 5
    }
    const mockHandler = jest.fn()

    component = render(
      <Blog blog={blog} updateBlog={mockHandler} />
    )
  })

  test('blog default visibility', () => {
    const div = component.container.querySelector('.viewInfo')
    expect(div).toHaveStyle('display: none')
  })
  
  test('clicking the button calls event handler once', () => {
    const button = component.container.querySelector('button')
    fireEvent.click(button)

    const div = component.container.querySelector('.viewInfo')
    expect(div).toHaveStyle('display: block;')
  })
})

describe('event handler test of Blog', () => {
  let mockHandler
  let component

  beforeEach(() => {
    const blog = {
      title: 'title',
      author: 'author',
      url: 'url',
      likes: 5,
      user: {
        id: '12345',
        user: 'user'
      }
    }
    const user = 'user'
    mockHandler = jest.fn()
  
    component = render(
      <Blog blog={blog} user={user} updateBlog={mockHandler} />
    )
  })
  test('clicking like button 2 times', () => {
    const likeButton = component.container.querySelector('.likeButton')

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})