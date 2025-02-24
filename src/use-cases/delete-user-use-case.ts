import {hash} from 'bcryptjs'
import { UsersRepository } from '@/repositories/users-repository'
import { UserAlreadyExists } from './errors/user-already-exists-error'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeleteUserUseCaseRequest {
    id: string
}

interface DeleteUserUseCaseResponse {
    User: User
}

export class DeleteUserUseCase{
    constructor(private usersRepository : UsersRepository){

    }

    async execute({id}:DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse>{
       const user = await this.usersRepository.delete(id)

       if(!user){
            throw new ResourceNotFoundError
       }

       return { User: user }
    }
    
   
   
}