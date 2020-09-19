export class UnexpectedError extends Error {
  constructor () {
    super('An error occurred. Try again later')
    this.name = 'UnexpectedError'
  }
}
