import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { Post } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { PrismaPostsRepository } from '@/repositories/prisma/prisma-posts-repository'

interface GetUserPostsUseCaseRequest {
    id: string
}

interface GetUserPostsUseCaseResponse {
    Post : Post[]
}

export class GetUserPostsUseCase {
    constructor(private usersRepository: UsersRepository) {

    }

    async execute({ id }: GetUserPostsUseCaseRequest): Promise<GetUserPostsUseCaseResponse> {
        const user = await this.usersRepository.findById(id)

        if (!user) {
            throw new ResourceNotFoundError
        }

        const posts = await new PrismaPostsRepository().getByUser(id)

        if (!posts) {
            throw new Error('Nenhum Post Encontrado')
        }


        return { Post : posts }
    }



}