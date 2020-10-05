import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { doesNotReject } from 'assert'
import { DatabaseService } from '../../src/modules/database/database.service'
import * as request from 'supertest'
import { AppModule } from '../../src/app.module'
import { INVALID_USER_ADDRESS, INVALID_USER_PHONE, VALID_USER, VALID_USER_DUPLICATED_CPF, VALID_USER_DUPLICATED_EMAIL } from './fixtures/user.fixture'

describe('User Creation Tests', () => {
    let app: INestApplication
    let databaseService: DatabaseService

    beforeAll(async () => {
        jest.setTimeout(30000)

        const module = await Test.createTestingModule({
            imports: [AppModule]
        }).compile()

        app = module.createNestApplication()
        app.useGlobalPipes(new ValidationPipe({ transform: true }))

        databaseService = module.get<DatabaseService>(DatabaseService)

        await app.init()
    })

    describe('User Creation', () => {
        it('Should create a valid user', async () => {
            await databaseService.cleanDatabase()
            return await request(app.getHttpServer())
            .post('/user')
            .send(VALID_USER)
            .expect(201)
        })
        
        it('Should try to create an user with invalid address', async () => {
            await databaseService.cleanDatabase()
            return await request(app.getHttpServer())
                .post('/user')
                .send(INVALID_USER_ADDRESS)
                .expect(400)
                .expect(res => {
                    expect(res.body.message).toEqual('ADDRESS_PERSISTENCY_ERROR')
                })
        })

        it('Should try to create an user with invalid phone', async () => {
            await databaseService.cleanDatabase()
            return await request(app.getHttpServer())
                .post('/user')
                .send(INVALID_USER_PHONE)
                .expect(400)
                .expect(res => {
                    expect(res.body.message).toEqual('PHONE_PERSISTENCY_ERROR')
                })
        })

        it('Should try to create an user with an already registered CPF', async () => {
            await databaseService.cleanDatabase()
            await request(app.getHttpServer())
                .post('/user')
                .send(VALID_USER)
                .expect(201)

            return await request(app.getHttpServer())
                .post('/user')
                .send(VALID_USER_DUPLICATED_CPF)
                .expect(400)
                .expect(res => {
                    expect(res.body.message).toEqual('USER_DUPLICATE_CPF')
                })
        })
        
        it('Should try to create an user with an already registered CPF', async () => {
            await databaseService.cleanDatabase()
            await request(app.getHttpServer())
                .post('/user')
                .send(VALID_USER)
                .expect(201)

            return await request(app.getHttpServer())
                .post('/user')
                .send(VALID_USER_DUPLICATED_EMAIL)
                .expect(400)
                .expect(res => {
                    expect(res.body.message).toEqual('USER_DUPLICATE_EMAIL')
                })
        })
    })

    afterAll(async () => {

    })
})