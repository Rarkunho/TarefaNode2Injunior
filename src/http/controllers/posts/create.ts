import { FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod'
import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository"
import { CreatePostUseCase } from "@/use-cases/create-post-usecase"

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createBodySchema = z.object({
        titulo: z.string(),
        conteudo: z.string(),
        created_at: z.string().transform((str) => new Date(str)),
        idAutor: z.string().uuid()
    })

    const { titulo, conteudo, created_at, idAutor } = createBodySchema.parse(request.body)

    try {
        const prismaPostsRepository = new PrismaPostsRepository()
        const createPostUseCase = new CreatePostUseCase(prismaPostsRepository)
        await createPostUseCase.execute({
            titulo,
            conteudo,
            created_at,
            idAutor
        })
    } catch (err) {
        throw err
    }

    return reply.status(201).send('Post Criado com sucesso')
}