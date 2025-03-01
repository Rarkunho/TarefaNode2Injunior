import { CommentsRepository } from '@/repositories/comments-repository'
import { Comentario } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetAllCommentUseCaseRequest {
}

interface GetAllCommentUseCaseResponse {
    Comment: Comentario[]
}

export class GetAllCommentUseCase {
    constructor(private CommentsRepository: CommentsRepository) {

    }

    async execute({}: GetAllCommentUseCaseRequest): Promise<GetAllCommentUseCaseResponse> {
        const comments = await this.CommentsRepository.getAll()

        if (!comments) {
            throw new ResourceNotFoundError
        }

        return { Comment : comments }
    }

}