import { hash } from 'bcryptjs'
import { UsersRepository } from '@/repositories/users-repository'
import { UserAlreadyExists } from './errors/user-already-exists-error'

interface RegisterUseCaseRequest {
    nome: string,
    senha_digest: string,
    email: string,
    foto: string | undefined
}

export class RegisterUseCase {
    constructor(private usersRepository: UsersRepository) {

    }

    async execute({ nome, email, senha_digest, foto }: RegisterUseCaseRequest) {
        const userWithSameEmail = await this.usersRepository.findByEmail(email)


        if (userWithSameEmail) {
            throw new UserAlreadyExists
        }

        const password_hash = await hash(senha_digest, 6)

        await this.usersRepository.create({ nome, email, senha_digest: password_hash, foto })
    }



}