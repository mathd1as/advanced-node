import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { FacebookAuthentication } from '@/domain/features'
import { AuthenticationError } from '@/domain/errors'
import { SaveFacebookAcountRepository, LoadUserAccountRepository } from '@/data/contracts/reopos/user-acount'
export class FacebookAuthenticationService {
  constructor(
    private readonly loadFacebookUserApi: LoadFacebookUserApi,
    private readonly userAccountRepo: LoadUserAccountRepository & SaveFacebookAcountRepository
  ) { }

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const facebookData = await this.loadFacebookUserApi.loadUser(params)

    if (facebookData !== undefined) {
      const accountData = await this.userAccountRepo.load({ email: facebookData.email })

      await this.userAccountRepo.saveWithFacebook({
        id: accountData?.id,
        name: accountData?.name ?? facebookData.name,
        email: facebookData.email,
        facebookId: facebookData.facebookId
      })
    }
    return new AuthenticationError()
  }
}
