import { Column, Entity, Index, ManyToOne } from 'typeorm'
import { DatabaseBaseEntity } from '../utils/base.entity'
import { UserEntity } from './user.entity'

/**
 * Information on user's addresses
 *
 * @export
 * @class AddressesEntity
 * @extends {DatabaseBaseEntity}
 */
@Entity({ name: 'addresses' })
export class AddressEntity extends DatabaseBaseEntity {

    @Column()
    cep: string

    @Column()
    neighborhood: string

    @Column()
    street: string

    @Column()
    number: string

    @Column()
    complement: string

    @Column()
    city: string

    @Column()
    state: string

    @Column()
    @Index('address_user_id_idx')
    userId: number

    @ManyToOne(type => UserEntity, user => user.addresses)
    user: Promise<UserEntity>
}