import { ApiProperty } from "@nestjs/swagger";

class AddressRequest {
    @ApiProperty()
    cep: string

    @ApiProperty()
    neighborhood: string

    @ApiProperty()
    street: string
    
    @ApiProperty()
    number: string
    
    @ApiProperty()
    complement: string
    
    @ApiProperty()
    city: string
    
    @ApiProperty()
    state: string
}

class PhoneRequest {
    @ApiProperty()
    ddd: string

    @ApiProperty()
    phoneNumber: string
}

enum Gender {
    Masculino = 'Masculino',
    Feminino = 'Feminino',
    Outro = 'Outro',
}

export class UserCreationRequest {
    @ApiProperty()
    name: string

    @ApiProperty()
    cpf: string

    @ApiProperty()
    gender: Gender

    @ApiProperty()
    email: string

    @ApiProperty()
    birthDate: Date

    @ApiProperty({ type: AddressRequest })
    address: AddressRequest

    @ApiProperty({ type: PhoneRequest })
    phone: PhoneRequest
}
