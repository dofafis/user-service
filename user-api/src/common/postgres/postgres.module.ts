import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AddressEntity } from '../../modules/database/entities/address.entity'
import { PhoneEntity } from '../../modules/database/entities/phone.entity'
import { UserEntity } from '../../modules/database/entities/user.entity'
import { ConfigModule } from '../config/config.module'
import { ConfigService } from '../config/config.service'

const DATABASE_ENTITIES = [UserEntity, PhoneEntity, AddressEntity]
@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => {
                return {
                    type: 'postgres',
                    entities: DATABASE_ENTITIES,
                    // entities: [__dirname + '/*.entity.{ts,js}'],
                    synchronize: true,
                    logging: false,
                    keepConnectionAlive: true,
                    host: config._config.postgres.host,
                    port: 5432,
                    username: config._config.postgres.username,
                    password: config._config.postgres.password,
                    database: config._config.postgres.database,
                } as any
            },
        }),
        TypeOrmModule.forFeature(DATABASE_ENTITIES),
    ],
    exports: [TypeOrmModule],
})
export class PostgresModule {}
