import { CommentsRepository } from '@/repositories/comments-repository'
import { Comentario } from '@prisma/client'

interface CreateCommentCaseRequest {
    idAutor: string,
    idPost: string,
    conteudo: string,
    created_at: Date
}

interface CreateCommentCaseResponse {
    Comment: Comentario
}

export class CreateCommentUseCase {
    constructor(private commentsRepository: CommentsRepository) { }

    async execute({ idAutor, idPost, conteudo, created_at }: CreateCommentCaseRequest): Promise<CreateCommentCaseResponse> {
        const comment = await this.commentsRepository.create({
            idAutor,
            created_at, 
            conteudo,
            idPost
        })

        return { Comment: comment }
    }



}