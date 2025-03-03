
import { Comentario } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { PostsRepository } from '@/repositories/posts-repository'
import { PrismaCommentsRepository } from '@/repositories/prisma/prisma-comments-repository'
import { UsersRepository } from '@/repositories/users-repository'

interface GetUserCommentsUseCaseRequest {
    id: string
}

interface GetUserCommentsUseCaseResponse {
    Comments : Comentario[]
}

export class GetUserCommentsUseCase {
    constructor(private userRepository : UsersRepository) {

    }

    async execute({ id }: GetUserCommentsUseCaseRequest): Promise<GetUserCommentsUseCaseResponse> {
        const user = await this.userRepository.findById(id)

        if (!user) {
            throw new ResourceNotFoundError
        }

        const comentarios = await new PrismaCommentsRepository().getByUser(id)

        if (!comentarios) {
            throw new Error('Nenhum Like Encontrado')
        }


        return { Comments : comentarios }
    }

}