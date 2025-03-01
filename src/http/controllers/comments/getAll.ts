import { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository"
import { GetAllCommentUseCase } from "@/use-cases/get-all-comment-use-case"

export async function getAll(request: FastifyRequest, reply: FastifyReply) {

    try {
        const prismaCommentsRepository = new PrismaCommentsRepository()
        const getAll = new GetAllCommentUseCase(prismaCommentsRepository)
        const Comments = await getAll.execute({})

        return reply.status(200).send(Comments)
    } catch (err) {
        if (err instanceof (ResourceNotFoundError)) {
            return reply.status(404).send({ message: err.message })
        }
        throw err
    }

}