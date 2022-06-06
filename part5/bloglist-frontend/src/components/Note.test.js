import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('testing rendering blog', () => {
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
  test('renders initial blog view ', () => {
    render(<Blog blog={blog} user={user} />)
    const element1 = screen.getByTestId('initial-element')
    expect(element1).not.toHaveTextContent('likes', 'some url', 'some title')

    const element2 = screen.getByTestId('hidden-element')
    expect(element2).toHaveStyle('display: none;')
  })

  test('render correctly when blog is expanded', async () => {
    render(<Blog blog={blog} user={user} />)

    const element = screen.getByTestId('hidden-element')
    const button = screen.getByTestId('view-button')
    await userEvent.click(button)
    screen.debug(element)
    expect(element).not.toHaveStyle('display: none;')
  })

  test('Like button click is working correctly', async () => {
    const mockHandler = jest.fn()
    render(<Blog blog={blog} user={user} handleLikeChange={mockHandler} />)
    const userTest = userEvent.setup()

    const button = screen.getByText('like')
    await userTest.click(button)
    await userTest.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
