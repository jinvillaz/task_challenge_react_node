import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './reducers/store'

jest.mock('axios')

test('renders Task System link', async () => {
  render(<Provider store={store}><App /> </Provider>, { wrapper: BrowserRouter })
  await waitFor(() => {
    const linkElement = screen.getByText(/Task System/i)
    expect(linkElement).toBeInTheDocument()
  })
})
