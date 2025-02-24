import {hash} from 'bcryptjs'
import { UsersRepository } from '@/repositories/users-repository'
import { UserAlreadyExists } from './errors/user-already-exists-error'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetUserUseCaseRequest {
    id: string
}

interface GetUserUseCaseResponse {
    User: User
}

export class GetUserUseCase{
    constructor(private usersRepository : UsersRepository){

    }

    async execute({id}:GetUserUseCaseRequest): Promise<GetUserUseCaseResponse>{
       const user = await this.usersRepository.findById(id)

       if(!user){
            throw new ResourceNotFoundError
       }

       return { User: user }
    }
    
   
   
}