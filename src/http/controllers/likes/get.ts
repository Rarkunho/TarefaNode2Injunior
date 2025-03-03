import { FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod'
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { GetLikeUseCase } from "@/use-cases/get-like-use-case"
import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository"


export async function get(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        id: z.string().uuid()
    })

    const { id } = getParamsSchema.parse(request.params)

    try {
        const prismaLikeRepository = new PrismaLikesRepository()
        const getLikeUseCase = new GetLikeUseCase(prismaLikeRepository)
        const Like = await getLikeUseCase.execute({
            id
        })
        return reply.status(200).send(Like)
    } catch (err) {
        if (err instanceof (ResourceNotFoundError)) {
            return reply.status(404).send({ message: err.message })
        }
        throw err
    }

}