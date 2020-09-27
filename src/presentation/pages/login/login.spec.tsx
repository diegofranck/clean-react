import React from 'react'
import { render, RenderResult } from '@testing-library/react'

import Login from './login'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(<Login/>)
  return {
    sut
  }
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const { sut } = makeSut()
    
    const errorWrap = sut.getByTestId('error-wrap')
    const emailStatus = sut.getByTestId('email-status')
    const passwordStatus = sut.getByTestId('password-status')
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement

    expect(errorWrap.childElementCount).toBe(0)

    expect(submitButton.disabled).toBeTruthy()

    expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('🔴')

    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus.textContent).toBe('🔴')
  })
})
