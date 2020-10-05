import { Module } from "@nestjs/common";
import { ConfigModule } from "../../common/config/config.module";
import { AppLoggerModule } from "../../common/logger/app-logger.module";
import { DatabaseModule } from "../database/database.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [AppLoggerModule, ConfigModule, DatabaseModule],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}