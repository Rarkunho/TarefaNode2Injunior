import { FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod'
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { GetUserPostsUseCase } from "@/use-cases/get-user-posts-use-case"

export async function getUserPosts(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        id: z.string().uuid()
    })

    const { id } = getParamsSchema.parse(request.params)

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const getUserPostsUseCase = new GetUserPostsUseCase(prismaUsersRepository)
        const userPosts = await getUserPostsUseCase.execute({
            id
        })
        return reply.status(200).send(userPosts)
    } catch (err) {
        if (err instanceof (ResourceNotFoundError)) {
            return reply.status(404).send({ message: err.message })
        }
        throw err
    }

}