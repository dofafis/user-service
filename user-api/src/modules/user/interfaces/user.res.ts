import { ApiResponseProperty } from "@nestjs/swagger";

enum Gender {
    Masculino = 'Masculino',
    Feminino = 'Feminino',
    Outro = 'Outro',
}

export class UserResponse {
    @ApiResponseProperty()
    id: number

    @ApiResponseProperty()
    name: string

    @ApiResponseProperty()
    cpf: string

    @ApiResponseProperty()
    gender: Gender

    @ApiResponseProperty()
    email: string

    @ApiResponseProperty()
    birthDate: Date

    @ApiResponseProperty()
    addresses: ICreatedAddress[]

    @ApiResponseProperty()
    phones: ICreatedPhone[]

    @ApiResponseProperty()
    createdOn: string

    @ApiResponseProperty()
    modifiedOn: string
}

export interface ICreatedAddress {
    id: number
    cep: string
    neighborhood: string
    street: string
    number: string
    complement: string
    city: string
    state: string
    userId: number
    createdOn: string
}

export interface ICreatedPhone {
    id: number
    ddd: string
    phoneNumber: string
    userId: number
    createdOn: string
}