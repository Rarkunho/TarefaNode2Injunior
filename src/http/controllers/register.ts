import { FastifyReply, FastifyRequest } from "fastify"

import {z} from 'zod'

import { prisma } from "@/lib/prisma"

export async function register(request :FastifyRequest,reply :FastifyReply){
    const registerBodySchema = z.object({
        nome: z.string(),
        email: z.string().email(),
        senha_digest: z.string().min(6),
        foto : z.string().optional()
    })

    const { nome,email,senha_digest, foto} = registerBodySchema.parse(request.body)

    await prisma.user.create({
        data: {
            nome,
            email,
            senha_digest,
            foto
        }
    })

    return reply.status(201).send('Usuario criado com sucesso')
}