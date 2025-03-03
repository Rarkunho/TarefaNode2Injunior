
import { Like } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { PrismaLikesRepository } from '@/repositories/prisma/prisma-likes-repository'
import { CommentsRepository } from '@/repositories/comments-repository'

interface GetCommentLikesUseCaseRequest {
    id: string
}

interface GetCommentLikesUseCaseResponse {
    Like : Like[]
}

export class GetCommentLikesUseCase {
    constructor(private commentsRepository : CommentsRepository) {

    }

    async execute({ id }: GetCommentLikesUseCaseRequest): Promise<GetCommentLikesUseCaseResponse> {
        const comment = await this.commentsRepository.get(id)

        if (!comment) {
            throw new ResourceNotFoundError
        }

        const likes = await new PrismaLikesRepository().getByComment(id)

        if (!likes) {
            throw new Error('Nenhum Like Encontrado')
        }


        return { Like : likes }
    }

}