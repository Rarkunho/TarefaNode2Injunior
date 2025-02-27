import { Post } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { PostsRepository, PostUpdateInput } from '@/repositories/posts-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

interface UpdatePostUseCaseRequest {
    id: string,
    data: PostUpdateInput
}

interface UpdatePostUseCaseResponse {
    post : Post
}

export class UpdatePostUseCase {
    constructor(private postsRepository: PostsRepository) {

    }

    async execute({ id, data }: UpdatePostUseCaseRequest): Promise<UpdatePostUseCaseResponse> {
        const post = await this.postsRepository.get(id)

        if (!post) {
            throw new ResourceNotFoundError
        }
        
        if(post.idAutor) {
            const authorExists = await new PrismaUsersRepository().findById(post.idAutor)
            if (!authorExists) {
                throw new Error('Id de Autor Invalida')
           }
        }

        const postUpdated = await this.postsRepository.update(id, data)
        if (!postUpdated) {
            throw new ResourceNotFoundError
        }

        return { post: postUpdated }
    }



}