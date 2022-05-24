import { FacebookAuthentication } from '@/domain/features'
import { AccessToken } from '@/domain/models'
import { Server } from 'http'

class FacebookLoginController {
  constructor(private readonly facebookAuthentication: FacebookAuthentication) { }
  async handle(httpRequest: any): Promise<HttpResponse> {
    try {
      if (httpRequest.token === '' || httpRequest.token === null || httpRequest.token === undefined) {
        return {
          statusCode: 400,
          data: new Error('The field token is required')
        }
      }
      const result = await this.facebookAuthentication.perform({ token: httpRequest.token })
      if (result instanceof AccessToken) {
        return {
          statusCode: 200,
          data: {
            accessToken: result.value
          }
        }
      }
      return {
        statusCode: 401,
        data: result
      }
    } catch (err) {
      return {
        statusCode: 500,
        data: new ServerError(new Error())
      }
    }

  }
}

type HttpResponse = {
  statusCode: number,
  data: any
}

class ServerError extends Error {
  constructor(error?: Error) {
    super('Server failed. Try again soon')
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}

describe('FacebookLoginController', () => {
  it('should return 400 if token is empty', () => {

  });
})
