import { FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod'
import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository"
import { CreateCommentUseCase } from "@/use-cases/create-comment-use-case"

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createBodySchema = z.object({
        idAutor: z.string().uuid(),
        created_at: z.string().transform((str) => new Date(str)),
        idPost: z.string().uuid(),
        conteudo: z.string()
    })

    const { idAutor, created_at, idPost, conteudo} = createBodySchema.parse(request.body)

    try {
        const prismaCommentsRepository = new PrismaCommentsRepository()
        const createCommentUseCase = new CreateCommentUseCase(prismaCommentsRepository)
        await createCommentUseCase.execute({
            idAutor, 
            created_at, 
            idPost, 
            conteudo
        })
    } catch (err) {
        throw err
    }

    return reply.status(201).send('Comentário Criado com sucesso')
}