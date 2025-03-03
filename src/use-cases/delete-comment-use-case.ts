import { Comentario } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { CommentsRepository } from '@/repositories/comments-repository'

interface DeleteCommentUseCaseRequest {
    id: string
}

interface DeleteCommentUseCaseResponse {
    Comment : Comentario
}

export class DeleteCommentUseCase {
    constructor(private CommentsRepository: CommentsRepository) {

    }

    async execute({ id }: DeleteCommentUseCaseRequest): Promise<DeleteCommentUseCaseResponse> {
        const Comment = await this.CommentsRepository.delete(id)

        if (!Comment) {
            throw new ResourceNotFoundError
        }

        return { Comment : Comment }
    }



}