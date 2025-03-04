import { FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod'
import { RegisterUseCase } from "@/use-cases/register-use-case"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { UserAlreadyExists } from "@/use-cases/errors/user-already-exists-error"

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        nome: z.string(),
        email: z.string().email(),
        senha_digest: z.string().min(6),
        foto: z.string().optional()
    })

    const { nome, email, senha_digest, foto } = registerBodySchema.parse(request.body)

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const registerUseCase = new RegisterUseCase(prismaUsersRepository)
        await registerUseCase.execute({
            nome,
            email,
            senha_digest,
            foto
        })
    } catch (err) {
        if (err instanceof (UserAlreadyExists)) {
            return reply.status(409).send({ message: err.message })
        }
        throw err
    }

    return reply.status(201).send('Usuario criado com sucesso')
}