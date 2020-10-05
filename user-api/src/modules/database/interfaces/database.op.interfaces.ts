export interface IPhone {
    ddd: string
    phoneNumber: string
    userId: number
}

export interface IAddress {
    cep: string
    street: string
    number: string
    complement: string
    city: string
    state: string
    neighborhood: string
    userId: number
}

enum Gender {
    Masculino = 'Masculino',
    Feminino = 'Feminino',
    Outro = 'Outro',
}

export interface IUser {
    name: string
    cpf: string
    gender: Gender
    email: string
    birthDate: Date
    address: IAddress
    phone: IPhone
}
