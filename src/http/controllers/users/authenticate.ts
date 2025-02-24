import { FastifyReply, FastifyRequest } from "fastify"

import {z} from 'zod'

import { AuthenticateUseCase} from "@/use-cases/authenticate-use-case"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"

export async function authenticate(request :FastifyRequest,reply :FastifyReply){
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        senha_digest: z.string().min(6)
    })

    const { email,senha_digest} = authenticateBodySchema.parse(request.body)

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)
        const {user} = await authenticateUseCase.execute({
            email,
            senha_digest
        })
        
        const token = await reply.jwtSign({},{
            sign:{
                sub: user.id
            }
        })

        const refreshToken = await reply.jwtSign({
            sign: {
                sub: user.id,
                expiresIn: '7d'
            }
        })

        return reply
            .status(200)
            .setCookie('refreshToken', refreshToken, {
                path: '/',
                secure: true,
                sameSite: true,
                httpOnly: true
            })
            .send({token})
    } catch (err) {
        return reply.status(401).send()
    }

    return reply.status(200).send('Usuario Autenticado')
}