import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetAllUserUseCaseRequest {
}

interface GetAllUserUseCaseResponse {
    user: User[]
}

export class GetAllUserUseCase {
    constructor(private usersRepository: UsersRepository) {

    }

    async execute({}: GetAllUserUseCaseRequest): Promise<GetAllUserUseCaseResponse> {
        const user = await this.usersRepository.getAll()

        if (!user) {
            throw new ResourceNotFoundError
        }

        return { user }
    }



}