import { FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod'
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository"
import { GetPostCommentsUseCase } from "@/use-cases/get-comment-by-post-use-case"

export async function getCommentsPost(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        id: z.string().uuid()
    })

    const { id } = getParamsSchema.parse(request.params)

    try {
        const prismaPostsRepository = new PrismaPostsRepository()
        const getCommentsPostUseCase = new GetPostCommentsUseCase(prismaPostsRepository)
        const comments = await getCommentsPostUseCase.execute({
            id
        })
        return reply.status(200).send(comments)
    } catch (err) {
        if (err instanceof (ResourceNotFoundError)) {
            return reply.status(404).send({ message: err.message })
        }
        throw err
    }

}