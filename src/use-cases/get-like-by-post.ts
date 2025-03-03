
import { Like } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { PrismaLikesRepository } from '@/repositories/prisma/prisma-likes-repository'
import { PostsRepository } from '@/repositories/posts-repository'

interface GetPostLikesUseCaseRequest {
    id: string
}

interface GetPostLikesUseCaseResponse {
    Like : Like[]
}

export class GetPostLikesUseCase {
    constructor(private postRepository : PostsRepository) {

    }

    async execute({ id }: GetPostLikesUseCaseRequest): Promise<GetPostLikesUseCaseResponse> {
        const post = await this.postRepository.get(id)

        if (!post) {
            throw new ResourceNotFoundError
        }

        const likes = await new PrismaLikesRepository().getByPost(id)

        if (!likes) {
            throw new Error('Nenhum Like Encontrado')
        }


        return { Like : likes }
    }

}