import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as rateLimit from 'express-rate-limit'
import * as slowDown from 'express-slow-down'
import * as helmet from 'helmet'
import { AppModule } from './app.module'
import {
    PROCESS_EXIT_INVALID_ARGUMENT,
    REQUIRED_NODE_ENV_ERROR,
    REQUIRED_PORT_ERROR,
} from './common/errors/process.exit'
import morgan = require('morgan')
import { UserModule } from './modules/user/user.module'

async function bootstrap() {
    if (!process.env.NODE_ENV) {
        Logger.error(REQUIRED_NODE_ENV_ERROR)
        process.exit(PROCESS_EXIT_INVALID_ARGUMENT)
    } else if (!process.env.PORT) {
        Logger.error(REQUIRED_PORT_ERROR)
        process.exit(PROCESS_EXIT_INVALID_ARGUMENT)
    }

    const app = await NestFactory.create(AppModule)
        .then(result => {
            return result
        })
        .catch(error => {
            console.error(error)
            return error
        })

    app.setGlobalPrefix('v1')
    app.useGlobalPipes(new ValidationPipe())
    app.use(helmet())
    app.enableCors()
    app.use(
        rateLimit({
            windowMs: 1 * 60 * 1000, // 1 minute
            max: 150, // limit each IP to 150 requests per windowMs
        })
    )
    app.use(
        slowDown({
            windowMs: 1 * 60 * 1000, // 1 minute
            delayAfter: 300, // allow 300 requests per minute, then...
            delayMs: 500, // begin adding 500ms of delay per request above 300
        })
    )

    // TODO - Remove v1 from routes in swagger
    const options = new DocumentBuilder()
        .setTitle('Users API')
        .setDescription('The User API swagger description')
        .addTag('user')
        .setVersion('0.1')
        .addBearerAuth()
        .build()

    const document = SwaggerModule.createDocument(app, options, {
        include: [UserModule],
    })
    SwaggerModule.setup('v1/ui', app, document)

    // https://github.com/expressjs/morgan
    if (process.env.DEBUG) {
        app.use(morgan('dev'))
    }

    await app
        .listen(Number(process.env.PORT), () => {
            Logger.log(`>>>> Starting ${process.env.NODE_ENV} on PORT ${process.env.PORT}`, 'APP')
        })
        .catch(console.error)
}
bootstrap()
