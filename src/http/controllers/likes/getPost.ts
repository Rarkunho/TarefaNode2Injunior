import { FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod'
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository"
import { GetPostLikesUseCase } from "@/use-cases/get-like-by-post"

export async function getLikesPost(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        id: z.string().uuid()
    })

    const { id } = getParamsSchema.parse(request.params)

    try {
        const prismaPostsRepository = new PrismaPostsRepository()
        const getLikesPostsUseCase = new GetPostLikesUseCase(prismaPostsRepository)
        const likes = await getLikesPostsUseCase.execute({
            id
        })
        return reply.status(200).send(likes)
    } catch (err) {
        if (err instanceof (ResourceNotFoundError)) {
            return reply.status(404).send({ message: err.message })
        }
        throw err
    }

}