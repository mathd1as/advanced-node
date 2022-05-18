import { LoadUserAccountRepository } from "@/data/contracts/reopos";

import { newDb } from 'pg-mem'
import { Entity, PrimaryGeneratedColumn, Column, getRepository } from "typeorm"

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

class PgUserAccountRepository implements LoadUserAccountRepository {
    async load(params: LoadUserAccountRepository.Params): Promise<LoadUserAccountRepository.Result> {
        return
    }
}


describe('PgUserAccountRepository', () => {
    describe('load', () => {
        it('should return an account if email exists', async () => {

            const db = newDb();
            const connection = await db.adapters.createTypeormConnection({
                type: 'postgres',
                entities: []
            })

            // create schema
            await connection.synchronize();
            const pgUserRepo = getRepository(PgUser)
            await pgUserRepo.save({ email: 'existing_email' })

            const sut = new PgUserAccountRepository()

            const account = await sut.load({ email: 'existing_email' })

            expect(account).toEqual({ id: '1' })
        });
    });
});
