import { FastifyReply, FastifyRequest } from "fastify"

import { z } from 'zod'

import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"

import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository"
import { DeleteCommentUseCase } from "@/use-cases/delete-comment-use-case"

export async function deleteComment(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        id: z.string().uuid()
    })

    const { id } = getParamsSchema.parse(request.params)

    try {
        const prismaCommentsRepository = new PrismaCommentsRepository()
        const deleteCommentUseCase = new DeleteCommentUseCase(prismaCommentsRepository)
        const Comment = await deleteCommentUseCase.execute({
            id
        })
        return reply.status(204).send(Comment)
    } catch (err) {
        if (err instanceof (ResourceNotFoundError)) {
            return reply.status(404).send({ message: err.message })
        }
        throw err
    }

}