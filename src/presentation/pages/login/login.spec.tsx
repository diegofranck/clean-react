import React from 'react'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import faker from 'faker'

import { ValidationStub } from '@/presentation/test'

import Login from './login'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()

  validationStub.errorMessage = faker.random.words()

  const sut = render(<Login validation={validationStub} />)

  return {
    sut,
    validationStub
  }
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const { sut, validationStub } = makeSut()

    const errorWrap = sut.getByTestId('error-wrap')
    const emailStatus = sut.getByTestId('email-status')
    const passwordStatus = sut.getByTestId('password-status')
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement

    expect(errorWrap.childElementCount).toBe(0)

    expect(submitButton.disabled).toBeTruthy()

    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')

    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should show email error if Validation fails', () => {
    const { sut, validationStub } = makeSut()

    const emailInput = sut.getByTestId('email')
    const emailStatus = sut.getByTestId('email-status')

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { sut, validationStub } = makeSut()

    const emailInput = sut.getByTestId('email')
    const emailStatus = sut.getByTestId('email-status')

    validationStub.errorMessage = null

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    expect(emailStatus.title).toBe('Tudo certo')
    expect(emailStatus.textContent).toBe('🟢')
  })

  test('Should show password error if Validation fails', () => {
    const { sut, validationStub } = makeSut()

    const passwordInput = sut.getByTestId('password')
    const passwordStatus = sut.getByTestId('password-status')

    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut, validationStub } = makeSut()

    const passwordInput = sut.getByTestId('password')
    const passwordStatus = sut.getByTestId('password-status')

    validationStub.errorMessage = null

    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    expect(passwordStatus.title).toBe('Tudo certo')
    expect(passwordStatus.textContent).toBe('🟢')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut, validationStub } = makeSut()

    const emailInput = sut.getByTestId('email')
    const passwordInput = sut.getByTestId('password')
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement

    validationStub.errorMessage = null

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    expect(submitButton.disabled).toBe(false)
  })
})
