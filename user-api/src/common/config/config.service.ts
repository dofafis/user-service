import { Injectable, Logger } from '@nestjs/common'
import * as fs from 'fs'
import { configJoi, IConfigClass as IConfig } from './config.constants'
import Joi = require('@hapi/joi')

const CONFIG_FILE_PATH: any = {
    'dev': 'config.dev.json',
    'staging': 'config.staging.json',
    'prod': 'config.prod.json',
}

@Injectable()
export class ConfigService {
    // tslint:disable-next-line variable-name
    public readonly _config: IConfig

    constructor() {
        this._config = this.loadFile(configJoi)
    }

    loadFile(joiObject: Joi.ObjectSchema) {
        try {
            // TODO - Merge config file to standart
            // TODO - Dynamically set the config type
            const configPath = CONFIG_FILE_PATH[String(process.env.NODE_ENV)]

            if (!configPath) {
                throw new Error('configPath is not set')
            }

            const config = JSON.parse(fs.readFileSync(configPath).toString())
            return this.validateFile<IConfig>(joiObject, config)
        } catch (e) {
            Logger.error(`Error loading ${process.env.NODE_ENV} JSON config file from ${process.env.CONFIG_PATH}.`, e)
            process.exit(1)
        }
    }

    private validateFile<T>(joiObject: Joi.ObjectSchema, config: any): T {
        const res = joiObject.validate(config, { stripUnknown: true })

        if (res.warning) {
            console.warn(res.warning)
        } else if (res.error) {
            throw res.error
        } else if (res.errors) {
            throw res.errors
        }

        return res.value
    }
}
