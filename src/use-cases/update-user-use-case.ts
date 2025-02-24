import { UsersRepository, UserUpdateInput } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { compare, hash } from 'bcryptjs'

interface UpdateUserUseCaseRequest {
    id: string,
    data: UserUpdateInput
}

interface UpdateUserUseCaseResponse {
    User: User
}

export class UpdateUserUseCase {
    constructor(private usersRepository: UsersRepository) {

    }

    async execute({ id, data }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
        const user = await this.usersRepository.findById(id)

        if (!user) {
            throw new ResourceNotFoundError
        }

        if (data.senha_digest) {
            const isSamePassword = await compare(data.senha_digest, user.senha_digest)
            if (isSamePassword) {
                throw new Error('Senha atual não pode ser igual a nova senha')
            }
            data.senha_digest = await hash(data.senha_digest, 6)
        }
        const userUpdated = await this.usersRepository.update(id, data)
        if (!userUpdated) {
            throw new ResourceNotFoundError
        }

        return { User: userUpdated }
    }



}