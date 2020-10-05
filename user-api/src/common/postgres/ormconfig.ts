import * as fs from 'fs'
import { ConnectionOptions } from 'typeorm'

const configFName = `./config.${process.env.NODE_ENV}.json`
const config = JSON.parse(fs.readFileSync(configFName).toString())

const connSettings = config.postgres

const typeOrmConfig: ConnectionOptions = {
    type: 'postgres',
    ...connSettings,
    entities: ['../../modules/database/entities/*.entity.{ts,js}'],
    migrations: ['../../modules/database/migrations/*.{ts,js}'],
    cli: {
        entitiesDir: '../../modules/database/entities',
        migrationsDir: '../../modules/database/migrations',
    },
}

export = typeOrmConfig
