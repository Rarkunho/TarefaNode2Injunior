import { LikesRepository } from '@/repositories/likes-repository'
import { Like } from '@prisma/client'

interface CreateLikeCaseRequest {
    idAutor: string,
    created_at: Date,
    idComentario: string | undefined,
    idPost: string | undefined
}

interface CreateLikeCaseResponse {
    Like: Like
}

export class CreateLikeUseCase {
    constructor(private LikesRepository: LikesRepository) { }

    async execute({ idAutor, created_at, idComentario, idPost }: CreateLikeCaseRequest): Promise<CreateLikeCaseResponse> {
        const Like = await this.LikesRepository.create({
            idAutor,
            created_at, 
            idComentario, 
            idPost
        })

        return { Like }
    }



}