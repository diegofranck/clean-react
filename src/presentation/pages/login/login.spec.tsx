import React from 'react'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import faker from 'faker'

import { ValidationStub } from '@/presentation/test'

import Login from './login'

type SutTypes = {
  sut: RenderResult
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()

  validationStub.errorMessage = params?.validationError

  const sut = render(<Login validation={validationStub} />)

  return {
    sut
  }
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    const errorWrap = sut.getByTestId('error-wrap')
    const emailStatus = sut.getByTestId('email-status')
    const passwordStatus = sut.getByTestId('password-status')
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement

    expect(errorWrap.childElementCount).toBe(0)

    expect(submitButton.disabled).toBeTruthy()

    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')

    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    const emailInput = sut.getByTestId('email')
    const emailStatus = sut.getByTestId('email-status')

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()

    const emailInput = sut.getByTestId('email')
    const emailStatus = sut.getByTestId('email-status')

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    expect(emailStatus.title).toBe('Tudo certo')
    expect(emailStatus.textContent).toBe('🟢')
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    const passwordInput = sut.getByTestId('password')
    const passwordStatus = sut.getByTestId('password-status')

    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()

    const passwordInput = sut.getByTestId('password')
    const passwordStatus = sut.getByTestId('password-status')

    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    expect(passwordStatus.title).toBe('Tudo certo')
    expect(passwordStatus.textContent).toBe('🟢')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()

    const emailInput = sut.getByTestId('email')
    const passwordInput = sut.getByTestId('password')
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    expect(submitButton.disabled).toBe(false)
  })

  test('Should show spinner on submit', () => {
    const { sut } = makeSut()

    const emailInput = sut.getByTestId('email')
    const passwordInput = sut.getByTestId('password')
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    fireEvent.click(submitButton)

    const spinner = sut.getByTestId('spinner')

    expect(spinner).toBeTruthy()
  })
})
