import { FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod'
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { GetUserLikesUseCase } from "@/use-cases/get-like-by-user"

export async function getLikesUser(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        id: z.string().uuid()
    })

    const { id } = getParamsSchema.parse(request.params)

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const getLikesUserUseCase = new GetUserLikesUseCase(prismaUsersRepository)
        const likes = await getLikesUserUseCase.execute({
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