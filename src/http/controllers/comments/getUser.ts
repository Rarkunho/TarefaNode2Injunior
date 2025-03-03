import { FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod'
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { GetUserCommentsUseCase } from "@/use-cases/get-comment-by-user-use-case"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"

export async function getCommentsUser(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        id: z.string().uuid()
    })

    const { id } = getParamsSchema.parse(request.params)

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const getCommentsUserUseCase = new GetUserCommentsUseCase(prismaUsersRepository)
        const comments = await getCommentsUserUseCase.execute({
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