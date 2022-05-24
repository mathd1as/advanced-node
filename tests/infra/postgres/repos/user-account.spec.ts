
import { newDb } from 'pg-mem'
import { PgUser } from '@/infra/postgres/entities'
import { PgUserAccountRepository } from '@/infra/postgres/repos'

describe('PgUserAccountRepository', () => {
  describe('load', () => {
    it('teste', async () => {
      const pgUserRepo = new PgUserAccountRepository()
      const result = pgUserRepo.load({ email: 'any_email' })
      console.log(result)
    });
  });
});
