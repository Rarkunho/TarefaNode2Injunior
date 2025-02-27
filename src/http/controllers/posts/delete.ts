import { FastifyReply, FastifyRequest } from "fastify"

import { z } from 'zod'

import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { DeletePostUseCase } from "@/use-cases/delete-post-use-case"

export async function deletePost(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        id: z.string().uuid()
    })

    const { id } = getParamsSchema.parse(request.params)

    try {
        const prismaPostsRepository = new PrismaPostsRepository()
        const deletePostUseCase = new DeletePostUseCase(prismaPostsRepository)
        const post = await deletePostUseCase.execute({
            id
        })
        return reply.status(204).send(post)
    } catch (err) {
        if (err instanceof (ResourceNotFoundError)) {
            return reply.status(404).send({ message: err.message })
        }
        throw err
    }

}