import { LoadUserAccountRepository } from "@/data/contracts/reopos";

import { newDb } from 'pg-mem'
import { Entity, PrimaryGeneratedColumn, Column, getRepository } from "typeorm"

class PgUserAccountRepository implements LoadUserAccountRepository {
  async load(params: LoadUserAccountRepository.Params): Promise<LoadUserAccountRepository.Result> {
    const tpgUser = new PgUser()
    console.log('___________')
    console.log({ tpgUser })
    const pgUserRepo = getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne({ email: 'existing_email' })

    if (pgUser) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name
      }
    }

  }
}

@Entity({ name: 'usuarios' })
class PgUser {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'nome', nullable: true })
  name!: string

  @Column()
  email!: string

  @Column({ name: 'id_facebook' })
  facebookId?: number
}


describe('PgUserAccountRepository', () => {
  describe('load', () => {
    // it('should return an account if email exists', async () => {

    //   const db = newDb();
    //   const connection = await db.adapters.createTypeormConnection({
    //     type: 'postgres',
    //     entities: [PgUser]
    //   })

    //   await connection.synchronize();
    //   const pgUserRepo = getRepository(PgUser)
    //   await pgUserRepo.save({ email: 'existing_email' })

    //   const sut = new PgUserAccountRepository()

    //   const account = await sut.load({ email: 'existing_email' })

    //   expect(account).toEqual({ id: '1' })
    // });

    it('should return undefined if email does not exist', async () => {
      const db = newDb();
      const connection = await db.adapters.createTypeormConnection({
        type: 'postgres',
        entities: [PgUser]
      })

      await connection.synchronize();

      const sut = new PgUserAccountRepository()

      const account = await sut.load({ email: 'new_email' })

      expect(account).toBeUndefined()
    });
  });
});
