import { FastifyReply, FastifyRequest } from "fastify"

import {z} from 'zod'

import { registerUseCase } from "@/use-cases/register-use-case"

export async function register(request :FastifyRequest,reply :FastifyReply){
    const registerBodySchema = z.object({
        nome: z.string(),
        email: z.string().email(),
        senha_digest: z.string().min(6),
        foto : z.string().optional()
    })

    const { nome,email,senha_digest, foto} = registerBodySchema.parse(request.body)

    try {
        await registerUseCase({
            nome,
            email,
            senha_digest,
            foto
        })
    } catch (error) {
        return reply.status(409).send('Email já existe')
    }

    return reply.status(201).send('Usuario criado com sucesso')
}