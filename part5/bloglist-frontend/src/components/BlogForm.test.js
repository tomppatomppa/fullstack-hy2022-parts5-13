import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('filling a new blog form', async () => {
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('title content')
  const AuthorInput = screen.getByPlaceholderText('author content')
  const UrlInput = screen.getByPlaceholderText('url content')

  const sendButton = screen.getByText('create')

  await userEvent.type(titleInput, 'testing title')
  await userEvent.type(AuthorInput, 'testing author')
  await userEvent.type(UrlInput, 'testing url')
  await userEvent.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing title')
  expect(createBlog.mock.calls[0][0].author).toBe('testing author')
  expect(createBlog.mock.calls[0][0].url).toBe('testing url')
})
