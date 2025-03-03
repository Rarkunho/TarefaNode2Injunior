import { LikesRepository } from '@/repositories/likes-repository'
import { Like } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeleteLikeUseCaseRequest {
    id: string
}

interface DeleteLikeUseCaseResponse {
    Like : Like
}

export class DeleteLikeUseCase {
    constructor(private LikesRepository: LikesRepository) {

    }

    async execute({ id }: DeleteLikeUseCaseRequest): Promise<DeleteLikeUseCaseResponse> {
        const like = await this.LikesRepository.delete(id)

        if (!like) {
            throw new ResourceNotFoundError
        }

        return { Like : like }
    }



}