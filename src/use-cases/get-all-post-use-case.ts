import { PostsRepository } from '@/repositories/posts-repository'
import { Post } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetAllPostUseCaseRequest {
}

interface GetAllPostUseCaseResponse {
    post: Post[]
}

export class GetAllPostUseCase {
    constructor(private PostsRepository: PostsRepository) {

    }

    async execute({}: GetAllPostUseCaseRequest): Promise<GetAllPostUseCaseResponse> {
        const posts = await this.PostsRepository.getAll()

        if (!posts) {
            throw new ResourceNotFoundError
        }

        return { post : posts }
    }



}