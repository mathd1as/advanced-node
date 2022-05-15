import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthenticationService } from '@/data/services'
import { LoadFacebookUserApi } from '@/data/contracts/apis'

import { mock, MockProxy } from 'jest-mock-extended'
import { CreateFacebookAcountRepository, LoadUserAccountRepository } from '@/data/contracts/reopos'

describe('FacebookAuthenticationService', () => {
  let facebookApi: MockProxy<LoadFacebookUserApi>
  let userAccounteRepo: MockProxy<LoadUserAccountRepository & CreateFacebookAcountRepository>
  let sut: FacebookAuthenticationService
  const token = 'any_token'

  beforeEach(() => {
    facebookApi = mock()
    facebookApi.loadUser.mockResolvedValue({
      email: 'any_email',
      name: 'any_name',
      facebookId: 'any_facebookId'
    })
    userAccounteRepo = mock()

    sut = new FacebookAuthenticationService(
      facebookApi,
      userAccounteRepo
    )
  })

  it('should call facebookApi with correct params', async () => {
    await sut.perform({ token })

    expect(facebookApi.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(facebookApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return authentication error when facebookApi return undefined', async () => {
    facebookApi.loadUser.mockResolvedValueOnce(undefined)

    const authResult = await sut.perform({ token })

    expect(authResult).toEqual(new AuthenticationError())
  })

  it('Shold call LoadUserAcountRepo when LoadFacebookApi returns data', async () => {
    await sut.perform({ token })

    expect(userAccounteRepo.load).toHaveBeenCalledWith({ email: 'any_email' })
    expect(userAccounteRepo.load).toHaveBeenCalledTimes(1)
  })

  it('Should call CreateUserAccountRepo when LoadUserAccountRepo returns undefined', async () => {
    await sut.perform({ token })

    expect(userAccounteRepo.createFromFacebook).toHaveBeenCalledWith({
      email: 'any_email',
      name: 'any_name',
      facebookId: 'any_facebookId'
    })
    expect(userAccounteRepo.load).toHaveBeenCalledTimes(1)
  })
})
