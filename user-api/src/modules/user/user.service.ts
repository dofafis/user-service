import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { UserEntity } from "../database/entities/user.entity";
import { IUser } from "../database/interfaces/database.op.interfaces";
import { ICreatedAddress, ICreatedPhone, ICreatedUser } from "../database/interfaces/database.res.interfaces";
import { UserError, UserErrorType } from "./interfaces/user.error";
import { UserCreationRequest } from "./interfaces/user.req";
import { UserResponse } from "./interfaces/user.res";

@Injectable()
export class UserService {

    constructor(private readonly databaseService: DatabaseService) {}

    async createUser(user: UserCreationRequest): Promise<UserResponse | UserError> {
        let persistedUser: ICreatedUser
        try {
            persistedUser = await this.databaseService.createUser(user as IUser)
            if (!persistedUser) {
                return {
                    status: 500,
                    message: UserErrorType.USER_PERSISTENCY_ERROR,
                }
            }
        } catch (error) {
            if(error.detail.toString().includes('Key (cpf)=') && error.detail.toString().includes('already exists'))
                return {
                    status: 400,
                    message: UserErrorType.USER_DUPLICATE_CPF,
                }
                
            if(error.detail.toString().includes('Key (email)=') && error.detail.toString().includes('already exists'))
                return {
                    status: 400,
                    message: UserErrorType.USER_DUPLICATE_EMAIL,
                }

            return {
                status: 500,
                message: UserErrorType.USER_PERSISTENCY_ERROR,
            }
        }

        try {
            const phone: ICreatedPhone = await this.databaseService.createPhone({
                ddd: user.phone.ddd,
                phoneNumber: user.phone.phoneNumber,
                userId: persistedUser.id,
            })
            if (!phone) {
                return {
                    status: 500,
                    message: UserErrorType.PHONE_PERSISTENCY_ERROR,
                }
            }
        } catch (error) {
            console.error(error.message)
            return {
                status: 400,
                message: UserErrorType.PHONE_PERSISTENCY_ERROR,
            }
        }

        try {
            const address: ICreatedAddress = await this.databaseService.createAddress({
                number: user.address.number,
                cep: user.address.cep,
                city: user.address.city,
                complement: user.address.complement,
                state: user.address.state,
                street: user.address.street,
                neighborhood: user.address.neighborhood,
                userId: persistedUser.id,
            })
            if (!address) {
                return {
                    status: 500,
                    message: UserErrorType.ADDRESS_PERSISTENCY_ERROR,
                }
            }
        } catch (error) {
            console.error(error)
            return {
                status: 400,
                message: UserErrorType.ADDRESS_PERSISTENCY_ERROR,
            }
        }

        return await this.databaseService.fetchUser(persistedUser.id)
    }

    async fetchUser(id: number): Promise<UserResponse | UserError>{
        try {
            const user = await this.databaseService.fetchUser(id)
            if(!user) {
                return {
                    status: 404,
                    message: UserErrorType.USER_NOT_FOUND,
                }
            }
            return user
        } catch (error) {
            return {
                status: 500,
                message: UserErrorType.USER_FETCH_INTERNAL_ERROR,
            }
        }
    }

    async fetchUserByCpf(cpf: string): Promise<UserResponse | UserError>{
        try {
            const user = await this.databaseService.fetchUserByCpf(cpf)
            if(!user) {
                return {
                    status: 404,
                    message: UserErrorType.USER_NOT_FOUND,
                }
            }
            return user
        } catch (error) {
            return {
                status: 500,
                message: UserErrorType.USER_FETCH_INTERNAL_ERROR,
            }
        }
    }

}
