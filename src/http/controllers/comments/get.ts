import { FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod'
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"

import { GetPostUseCase } from "@/use-cases/get-post-use-case"
import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository"
import { GetCommentUseCase } from "@/use-cases/get-comentario-use-case"

export async function get(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        id: z.string().uuid()
    })

    const { id } = getParamsSchema.parse(request.params)

    try {
        const prismaCommentRepository = new PrismaCommentsRepository()
        const getCommentUseCase = new GetCommentUseCase(prismaCommentRepository)
        const comment = await getCommentUseCase.execute({
            id
        })
        return reply.status(200).send(comment)
    } catch (err) {
        if (err instanceof (ResourceNotFoundError)) {
            return reply.status(404).send({ message: err.message })
        }
        throw err
    }

}