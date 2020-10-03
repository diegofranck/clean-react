import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { Authentication, AuthenticationParams } from '@/domain/usecases'

export class AuthenticationSpy implements Authentication {
  params: AuthenticationParams

  account = mockAccountModel()

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    return Promise.resolve(this.account)
  }
}
