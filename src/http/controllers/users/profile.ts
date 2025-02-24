import { FastifyReply, FastifyRequest } from "fastify"
import { GetUserUseCase } from "@/use-cases/get-use-case"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"

export async function profile(request: FastifyRequest, reply: FastifyReply) {

    const prismaUsersRepository = new PrismaUsersRepository()
    const getUserUseCase = new GetUserUseCase(prismaUsersRepository)
    const { user } = await getUserUseCase.execute({
        id: request.user.sub
    })
    return reply.status(200).send({
        user: {
            ...user,
            senha_digest: undefined
        }
    })
}