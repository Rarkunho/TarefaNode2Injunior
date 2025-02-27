import { FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod'
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository"
import { UpdatePostUseCase } from "@/use-cases/update-post-use-case"

export async function update(request: FastifyRequest, reply: FastifyReply) {
    const updateParamsSchema = z.object({
        id: z.string().uuid()
    })

    const updateBodySchema = z.object({
        titulo: z.string().optional(),
        conteudo: z.string().optional(),
        created_at: z.date().optional(),
        idAutor: z.string().uuid().optional()
    })

    const { id } = updateParamsSchema.parse(request.params)
    const { titulo, conteudo, created_at, idAutor } = updateBodySchema.parse(request.body)

    try {
        const prismaPostsRepository = new PrismaPostsRepository()
        const updatePostUseCase = new UpdatePostUseCase(prismaPostsRepository)
        const post = await updatePostUseCase.execute({
            id,
            data: {
                titulo,
                conteudo,
                created_at,
                idAutor
            }
        })
        return reply.status(200).send(post)
    } catch (err) {
        if (err instanceof (ResourceNotFoundError)) {
            return reply.status(404).send({ message: err.message })
        }
        throw err
    }

}