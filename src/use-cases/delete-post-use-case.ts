import { UsersRepository } from '@/repositories/users-repository'
import { PostsRepository } from '@/repositories/posts-repository'
import { User } from '@prisma/client'
import { Post } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeletePostUseCaseRequest {
    id: string
}

interface DeletePostUseCaseResponse {
    Post : Post
}

export class DeletePostUseCase {
    constructor(private postsRepository: PostsRepository) {

    }

    async execute({ id }: DeletePostUseCaseRequest): Promise<DeletePostUseCaseResponse> {
        const post = await this.postsRepository.delete(id)

        if (!post) {
            throw new ResourceNotFoundError
        }

        return { Post : post }
    }



}