export interface LoadUserAccountRepository {
  load: (params: LoadUserAccountRepository.Params) => Promise<LoadUserAccountRepository.Result>
}

export namespace LoadUserAccountRepository {
  export type Params = {
    email: string
  }

  export type Result = undefined
}

export interface CreateFacebookAcountRepository {
  createFromFacebook: (params: CreateFacebookAcountRepository.Params) => Promise<void>
}

export namespace CreateFacebookAcountRepository {
  export type Params = {
    email: string
    name: string
    facebookId: string
  }
}
