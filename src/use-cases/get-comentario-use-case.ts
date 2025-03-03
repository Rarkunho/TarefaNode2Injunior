import { Comentario } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { CommentsRepository } from '@/repositories/comments-repository'


interface GetCommentUseCaseRequest {
    id: string
}

interface GetCommentUseCaseResponse {
    Comment : Comentario
}

export class GetCommentUseCase {
    constructor(private CommentsRepository : CommentsRepository) {

    }

    async execute({ id }: GetCommentUseCaseRequest): Promise<GetCommentUseCaseResponse> {
        const Comment = await this.CommentsRepository.get(id)

        if (!Comment) {
            throw new ResourceNotFoundError
        }

        return { Comment : Comment}
    }



}