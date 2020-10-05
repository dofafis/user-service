import { Module } from '@nestjs/common'
import { PostgresModule } from '../../common/postgres/postgres.module'
import { DatabaseService } from './database.service'

@Module({
    imports: [PostgresModule],
    providers: [DatabaseService],
    exports: [DatabaseService],
})
export class DatabaseModule {}
