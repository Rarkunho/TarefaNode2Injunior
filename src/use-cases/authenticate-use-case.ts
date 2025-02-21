import {compare, hash} from 'bcryptjs'
import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { User } from '@prisma/client'
import { error } from 'console'

interface AuthenticateUseCaseRequest {
    email : string,
    senha_digest : string
}

interface AuthenticateUseCaseResponse {
    user : User
}

export class AuthenticateUseCase{
    constructor(private usersRepository : UsersRepository){

    }

    async execute({email, senha_digest}:AuthenticateUseCaseRequest) : Promise<AuthenticateUseCaseResponse>{
        const user = await this.usersRepository.findByEmail(email) 
    
    
        if (!user){
            throw new InvalidCredentialsError
        }

        const doesPasswordMatch = await compare(senha_digest, user.senha_digest)
    
        if(!doesPasswordMatch){
            throw InvalidCredentialsError
        }

        return {user}
    }
    
   
   
}