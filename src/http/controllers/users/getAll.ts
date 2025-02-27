import { FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod'
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { GetAllUserUseCase } from "@/use-cases/get-all-user-use-case"

export async function getAll(request: FastifyRequest, reply: FastifyReply) {

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const getAll = new GetAllUserUseCase(prismaUsersRepository)
        const user = await getAll.execute({})

        return reply.status(200).send(user)
    } catch (err) {
        if (err instanceof (ResourceNotFoundError)) {
            return reply.status(404).send({ message: err.message })
        }
        throw err
    }

}