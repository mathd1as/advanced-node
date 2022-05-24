import { LoadUserAccountRepository, SaveFacebookAccountRepository } from "@/data/contracts/reopos";
import { getRepository } from "typeorm"
import { PgUser } from "@/infra/postgres/entities";

export class PgUserAccountRepository implements LoadUserAccountRepository {
  private readonly pgUserRepo = getRepository(PgUser)

  async load(params: LoadUserAccountRepository.Params): Promise<LoadUserAccountRepository.Result> {
    const pgUser = await this.pgUserRepo.findOne({ email: params.email })

    if (pgUser) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name
      }
    }
  }

  async saveWithFacebook(params: SaveFacebookAccountRepository.Params): Promise<SaveFacebookAccountRepository.Result> { 
    return {
      id: 'teste'
    }
  }
}
