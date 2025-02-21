import { FastifyReply, FastifyRequest } from "fastify"

import {z} from 'zod'

import { AuthenticateUseCase} from "@/use-cases/authenticate-use-case"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error"

export async function authenticate(request :FastifyRequest,reply :FastifyReply){
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        senha_digest: z.string().min(6)
    })

    const { email,senha_digest} = authenticateBodySchema.parse(request.body)

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)
        await authenticateUseCase.execute({
            email,
            senha_digest
        })
    } catch (err) {
        if (err instanceof(InvalidCredentialsError)){
            return reply.status(400).send({message:err.message})
        }
        return reply.status(401).send()
    }

    return reply.status(200).send('Usuario Autenticado')
}