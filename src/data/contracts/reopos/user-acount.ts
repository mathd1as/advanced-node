export interface LoadUserAccountRepository {
  load: (params: LoadUserAccountRepository.Params) => Promise<LoadUserAccountRepository.Result>
}

export namespace LoadUserAccountRepository {
  export type Params = {
    email: string
  }

  export type Result = {
    id?: string
    name?: string
  }
}

export interface SaveFacebookAcountRepository {
  saveWithFacebook: (params: SaveFacebookAcountRepository.Params) => Promise<void>
}

export namespace SaveFacebookAcountRepository {
  export type Params = {
    id?: string
    email: string
    name: string
    facebookId: string
  }
}
