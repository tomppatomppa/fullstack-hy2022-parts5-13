import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders blog', () => {
  const blog = {
    title: 'Some Title',
    author: 'some author',
    url: 'some url',
    user: [
      {
        name: 'some',
      },
    ],
  }
  const user = {
    username: 'some name',
  }

  render(<Blog blog={blog} user={user} />)
  const element1 = screen.getByTestId('initial-element')
  expect(element1).not.toHaveTextContent('likes', 'some url', 'some title')

  const element2 = screen.getByTestId('hidden-element')
  expect(element2).toHaveStyle('none:')
})
