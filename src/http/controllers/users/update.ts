import { FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod'
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { UpdateUserUseCase } from "@/use-cases/update-user-use-case"

export async function update(request: FastifyRequest, reply: FastifyReply) {
    const updateParamsSchema = z.object({
        id: z.string().uuid()
    })

    const updateBodySchema = z.object({
        nome: z.string().optional(),
        email: z.string().email().optional(),
        senha_digest: z.string().min(6).optional(),
        foto: z.string().optional()
    })

    const { id } = updateParamsSchema.parse(request.params)
    const { nome, email, senha_digest, foto } = updateBodySchema.parse(request.body)

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const updateUserUseCase = new UpdateUserUseCase(prismaUsersRepository)
        const user = await updateUserUseCase.execute({
            id,
            data: {
                nome,
                email,
                senha_digest,
                foto
            }
        })
        return reply.status(200).send(user)
    } catch (err) {
        if (err instanceof (ResourceNotFoundError)) {
            return reply.status(404).send({ message: err.message })
        }
        throw err
    }

}