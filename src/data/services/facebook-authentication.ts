import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { FacebookAuthentication } from '@/domain/features'
import { AuthenticationError } from '@/domain/errors'
import { CreateFacebookAcountRepository, LoadUserAccountRepository } from '../contracts/reopos/user-acount'
export class FacebookAuthenticationService {
  constructor(
    private readonly loadFacebookUserApi: LoadFacebookUserApi,
    private readonly userAccountRepo: CreateFacebookAcountRepository & LoadUserAccountRepository
  ) { }

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const facebookData = await this.loadFacebookUserApi.loadUser(params)

    if (facebookData !== undefined) {
      await this.userAccountRepo.load({ email: facebookData.email })
      await this.userAccountRepo.createFromFacebook(facebookData)
    }

    return new AuthenticationError()
  }
}
