import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ICreatedUser, ICreatedPhone, ICreatedAddress } from './interfaces/database.res.interfaces'
import moment = require('moment')
import { IAddress, IPhone, IUser } from './interfaces/database.op.interfaces'
import { UserEntity } from './entities/user.entity'
import { PhoneEntity } from './entities/phone.entity'
import { AddressEntity } from './entities/address.entity'
import { plainToClass } from 'class-transformer'
import { UserResponse } from '../user/interfaces/user.res'

@Injectable()
export class DatabaseService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(PhoneEntity)
        private readonly phoneRepository: Repository<PhoneEntity>,
        @InjectRepository(AddressEntity)
        private readonly addressRepository: Repository<AddressEntity>,
    ) {}

    async createUser(user: IUser): Promise<ICreatedUser> {
        const persistedUser = await this.userRepository.save(plainToClass(UserEntity, user))
        return persistedUser as ICreatedUser
    }

    async createPhone(phone: IPhone): Promise<ICreatedPhone> {
        const persistedPhone = await this.phoneRepository.save(plainToClass(PhoneEntity, phone))
        return persistedPhone as ICreatedPhone
    }

    async createAddress(address: IAddress): Promise<ICreatedAddress> {
        const persistedAddress = await this.addressRepository.save(address)
        return persistedAddress as ICreatedAddress
    }

    async fetchUser(id: number): Promise<UserEntity> {
        return await this.userRepository.findOne(id, { relations: ['phones', 'addresses'] })
    }

    async fetchUserByCpf(cpf: string): Promise<UserEntity> {
        return await this.userRepository.createQueryBuilder('users')
            .where({ cpf })
            .select('*')
            .relation('phones')
            .relation('addresses')
            .execute()
            .then(result => {
                if (
                    !result ||
                    !result.generatedMaps ||
                    !Array.isArray(result.generatedMaps) ||
                    result.generatedMaps.length === 0
                ) {
                    return undefined
                } else {
                    return result.raw[0]
                }
            })
    }

    async cleanDatabase() {
        await this.addressRepository.createQueryBuilder().delete().execute()
        await this.phoneRepository.createQueryBuilder().delete().execute()
        await this.userRepository.createQueryBuilder().delete().execute()
    }

}
