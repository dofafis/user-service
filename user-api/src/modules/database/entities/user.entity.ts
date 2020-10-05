import { Column, Entity, Index, OneToMany } from 'typeorm'
import { DatabaseBaseEntity } from '../utils/base.entity'
import { AddressEntity } from './address.entity'
import { PhoneEntity } from './phone.entity'

@Entity({ name: 'users' })
export class UserEntity extends DatabaseBaseEntity {

    @Column()
    name: string

    @Column({ unique: true })
    @Index('user_cpf_idx')
    cpf: string

    @Column()
    gender: Gender

    @Column({ unique: true })
    @Index('user_email_idx')
    email: string

    @Column()
    birthDate: Date

    @OneToMany(type => AddressEntity, address => address.user)
    addresses: AddressEntity[]

    @OneToMany(type => PhoneEntity, phone => phone.user)
    phones: PhoneEntity[]

}

enum Gender {
    Masculino = 'Masculino',
    Feminino = 'Feminino',
    Outro = 'Outro',
}