import { IAddress, IPhone } from "./database.op.interfaces";

export interface ICreatedUser {
    id: number
    name: string
    email: string
    birthDate: Date
    addresses: IAddress[]
    phones: IPhone[]
    createdOn: string
}

export interface ICreatedAddress {
    id: number
    cep: string
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