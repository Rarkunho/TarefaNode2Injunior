import { Comentario } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CommentsRepository, CommentUpdateInput } from '@/repositories/comments-repository'

interface UpdateCommentUseCaseRequest {
    id: string,
    data: CommentUpdateInput
}

interface UpdateCommentUseCaseResponse {
    Comment : Comentario
}

export class UpdateCommentUseCase {
    constructor(private CommentsRepository: CommentsRepository) {

    }

    async execute({ id, data }: UpdateCommentUseCaseRequest): Promise<UpdateCommentUseCaseResponse> {
        const Comment = await this.CommentsRepository.get(id)

        if (!Comment) {
            throw new ResourceNotFoundError
        }
        
        if(Comment.idAutor) {
            const authorExists = await new PrismaUsersRepository().findById(Comment.idAutor)
            if (!authorExists) {
                throw new Error('Id de Autor Invalida')
           }
        }

        const CommentUpdated = await this.CommentsRepository.update(id, data)
        if (!CommentUpdated) {
            throw new ResourceNotFoundError
        }

        return { Comment: CommentUpdated }
    }



}