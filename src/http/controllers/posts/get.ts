import { FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod'
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository"
import { GetPostUseCase } from "@/use-cases/get-post-use-case"

export async function get(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        id: z.string().uuid()
    })

    const { id } = getParamsSchema.parse(request.params)

    try {
        const prismaPostsRepository = new PrismaPostsRepository()
        const getPostUseCase = new GetPostUseCase(prismaPostsRepository)
        const post = await getPostUseCase.execute({
            id
        })
        return reply.status(200).send(post)
    } catch (err) {
        if (err instanceof (ResourceNotFoundError)) {
            return reply.status(404).send({ message: err.message })
        }
        throw err
    }

}