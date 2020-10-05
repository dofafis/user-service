import Joi = require('@hapi/joi')

export const configJoi = Joi.object({
    apiName: Joi.string().exist(),
    postgres: Joi.object().exist().keys({
        host: Joi.string().exist(),
        username: Joi.string().exist(),
        password: Joi.string().exist(),
        database: Joi.string().exist(),
    }),
})

export class IConfigClass {
    apiName: string
    postgres: {
        host: string
        username: string
        password: string
        database: string
    }
}
