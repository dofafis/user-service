import { BadRequestException, Body, Controller, Get, HttpException, InternalServerErrorException, NotFoundException, Optional, Param, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { OperationObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { UserError } from "./interfaces/user.error";
import { UserCreationRequest } from "./interfaces/user.req";
import { UserResponse } from "./interfaces/user.res";
import { UserService } from "./user.service";

@Controller('user')
@ApiTags('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post()
    @ApiOperation({ title: 'Creates an user and returns it.' } as Partial<OperationObject>)
    @ApiCreatedResponse({ description: 'OK', type: UserResponse })
    async createUser(@Body() user: UserCreationRequest): Promise<UserResponse | UserError> {
        const response = await this.userService.createUser(user)

        if(response['status']) {
            if(response['status'] === 500)
                throw new InternalServerErrorException(response, response['message'])
            else if(response['status'] === 404)
                throw new NotFoundException(response, response['message'])
            else if(response['status'] === 400)
                throw new BadRequestException(response, response['message'])
        }

        return response
    }

    @Get('fetchById')
    @ApiOperation({ title: 'Gets a user by id' } as Partial<OperationObject>)
    async fetchUser(
        @Param('id') id: number
    ): Promise<UserResponse | UserError> {
        return await this.userService.fetchUser(id)
    }

    @Get('fetchByCpf')
    @ApiOperation({ title: 'Gets an user by id' } as Partial<OperationObject>)
    async fetchUserByCpf(
        @Param('cpf') cpf: string
    ): Promise<UserResponse | UserError> {
        return await this.userService.fetchUserByCpf(cpf)
    }

}