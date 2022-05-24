import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { FacebookAuthentication } from '@/domain/features'
import { AuthenticationError } from '@/domain/errors'
import { SaveFacebookAccountRepository, LoadUserAccountRepository } from '@/data/contracts/reopos/user-acount'
import { AccessToken, FacebookAccount } from '@/domain/models'
import { TokenGenerator } from '@/data/contracts/crypto'

export class FacebookAuthenticationService {
  constructor(
    private readonly loadFacebookUserApi: LoadFacebookUserApi,
    private readonly userAccountRepo: LoadUserAccountRepository & SaveFacebookAccountRepository,
    private readonly crypto: TokenGenerator
  ) { }

  async perform(params: FacebookAuthentication.Params): Promise<FacebookAuthentication.Result> {
    const facebookData = await this.loadFacebookUserApi.loadUser(params)

    if (facebookData !== undefined) {
      const accountData = await this.userAccountRepo.load({ email: facebookData.email })
      const facebooAccount = new FacebookAccount(facebookData, accountData)
      const { id } = await this.userAccountRepo.saveWithFacebook(facebooAccount)
      const token = await this.crypto.generateToken({ key: id, expirationInMs: AccessToken.expirationInMs })
      return new AccessToken(token)
    }

    return new AuthenticationError()
  }
}
