import { FastifyReply, FastifyRequest } from "fastify"

import { z } from 'zod'

import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { DeleteLikeUseCase } from "@/use-cases/delete-like-use-case"
import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository"

export async function deleteLike(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        id: z.string().uuid()
    })

    const { id } = getParamsSchema.parse(request.params)

    try {
        const prismaLikesRepository = new PrismaLikesRepository()
        const deleteLikeUseCase = new DeleteLikeUseCase(prismaLikesRepository)
        const like = await deleteLikeUseCase.execute({
            id
        })
        return reply.status(204).send(like)
    } catch (err) {
        if (err instanceof (ResourceNotFoundError)) {
            return reply.status(404).send({ message: err.message })
        }
        throw err
    }

}