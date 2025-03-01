import { FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod'
import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository"
import { CreateLikeUseCase } from "@/use-cases/create-like-use-case"

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createBodySchema = z.object({
        idAutor: z.string().uuid(),
        created_at: z.string().transform((str) => new Date(str)),
        idPost: z.string().uuid().optional(),
        idComentario: z.string().uuid().optional()
    })

    const { idAutor, created_at, idPost, idComentario } = createBodySchema.parse(request.body)

    try {
        const hasPostAndComment = idPost && idComentario
        if (hasPostAndComment) {
            throw new Error('Você não pode dar like em um post e um comentário ao mesmo tempo')
        }
    } catch (err) {
        throw err
    }

    try {
        const prismaLikesRepository = new PrismaLikesRepository()
        const createLikeUseCase = new CreateLikeUseCase(prismaLikesRepository)
        await createLikeUseCase.execute({
            idAutor,
            created_at,
            idPost,
            idComentario
        })
    } catch (err) {
        throw err
    }

    return reply.status(201).send('Like Criado com sucesso')
}