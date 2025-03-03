import { FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod'
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository"
import { UpdateCommentUseCase } from "@/use-cases/update-comment-use-case"

export async function update(request: FastifyRequest, reply: FastifyReply) {
    const updateParamsSchema = z.object({
        id: z.string().uuid()
    })

    const updateBodySchema = z.object({
        conteudo: z.string().optional(),
        idAutor: z.string().uuid().optional(),
        idPost: z.string().uuid().optional()
    })

    const { id } = updateParamsSchema.parse(request.params)
    const { conteudo, idAutor, idPost } = updateBodySchema.parse(request.body)

    try {
        const prismaCommentsRepository = new PrismaCommentsRepository()
        const updateCommentUseCase = new UpdateCommentUseCase(prismaCommentsRepository)
        const comment = await updateCommentUseCase.execute({
            id,
            data: {
                conteudo, 
                idAutor, 
                idPost 
            }
        })
        return reply.status(200).send(comment)
    } catch (err) {
        if (err instanceof (ResourceNotFoundError)) {
            return reply.status(404).send({ message: err.message })
        }
        throw err
    }

}