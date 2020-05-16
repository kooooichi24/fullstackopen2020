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

    component = render(
      <Blog blog={blog} />
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