import { Like } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { LikesRepository } from '@/repositories/likes-repository'


interface GetLikeUseCaseRequest {
    id: string
}

interface GetLikeUseCaseResponse {
    Like : Like
}

export class GetLikeUseCase {
    constructor(private LikesRepository : LikesRepository) {

    }

    async execute({ id }: GetLikeUseCaseRequest): Promise<GetLikeUseCaseResponse> {
        const Like = await this.LikesRepository.get(id)

        if (!Like) {
            throw new ResourceNotFoundError
        }

        return { Like : Like }
    }



}