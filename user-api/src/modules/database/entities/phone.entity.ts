import { Column, Entity, Index, ManyToOne } from 'typeorm'
import { DatabaseBaseEntity } from '../utils/base.entity'
import { UserEntity } from './user.entity'

@Entity({ name: 'phones' })
export class PhoneEntity extends DatabaseBaseEntity {

    @Column()
    ddd: string

    @Column()
    phoneNumber: string

    @Column()
    @Index('phones_user_id_idx')
    userId: number

    @ManyToOne(type => UserEntity, user => user.phones)
    user: Promise<UserEntity>

}