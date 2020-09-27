import React from 'react'
import { render } from '@testing-library/react'

import Login from './login'

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const { getByTestId } = render(<Login/>)
    const errorWrap = getByTestId('error-wrap')
    const emailStatus = getByTestId('email-status')
    const passwordStatus = getByTestId('password-status')
    const submitButton = getByTestId('submit') as HTMLButtonElement

    expect(errorWrap.childElementCount).toBe(0)

    expect(submitButton.disabled).toBeTruthy()

    expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('🔴')

    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus.textContent).toBe('🔴')
  })
})
