
import { Like } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { PrismaLikesRepository } from '@/repositories/prisma/prisma-likes-repository'
import { UsersRepository } from '@/repositories/users-repository'

interface GetUserLikesUseCaseRequest {
    id: string
}

interface GetUserLikesUseCaseResponse {
    Like : Like[]
}

export class GetUserLikesUseCase {
    constructor(private userRepository : UsersRepository) {

    }

    async execute({ id }: GetUserLikesUseCaseRequest): Promise<GetUserLikesUseCaseResponse> {
        const user = await this.userRepository.findById(id)

        if (!user) {
            throw new Error('Usuário não encontrado')
        }

        const likes = await new PrismaLikesRepository().getByUser(id)

        if (!likes) {
            throw new Error('Nenhum Like Encontrado')
        }


        return { Like : likes }
    }

}