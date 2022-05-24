import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { FacebookAuthentication } from '@/domain/features'
import { AuthenticationError } from '@/domain/errors'
import { SaveFacebookAccountRepository, LoadUserAccountRepository } from '@/data/contracts/reopos/user-acount'
import { FacebookAccount } from '@/domain/models'
export class FacebookAuthenticationService {
  constructor(
    private readonly loadFacebookUserApi: LoadFacebookUserApi,
    private readonly userAccountRepo: LoadUserAccountRepository & SaveFacebookAccountRepository
  ) { }

  async perform(params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const facebookData = await this.loadFacebookUserApi.loadUser(params)

    if (facebookData !== undefined) {
      const accountData = await this.userAccountRepo.load({ email: facebookData.email })
      const facebooAccount = new FacebookAccount(facebookData, accountData)
      await this.userAccountRepo.saveWithFacebook(facebooAccount)
    }
    return new AuthenticationError()
  }
}
