
import { Comentario } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { PostsRepository } from '@/repositories/posts-repository'
import { PrismaCommentsRepository } from '@/repositories/prisma/prisma-comments-repository'

interface GetPostCommentsUseCaseRequest {
    id: string
}

interface GetPostCommentsUseCaseResponse {
    Comments : Comentario[]
}

export class GetPostCommentsUseCase {
    constructor(private postRepository : PostsRepository) {

    }

    async execute({ id }: GetPostCommentsUseCaseRequest): Promise<GetPostCommentsUseCaseResponse> {
        const post = await this.postRepository.get(id)

        if (!post) {
            throw new ResourceNotFoundError
        }

        const comentarios = await new PrismaCommentsRepository().getByPost(id)

        if (!comentarios) {
            throw new Error('Nenhum Like Encontrado')
        }


        return { Comments : comentarios }
    }

}