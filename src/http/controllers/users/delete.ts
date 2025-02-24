import { FastifyReply, FastifyRequest } from "fastify"

import {z} from 'zod'

import { DeleteUserUseCase } from "@/use-cases/delete-user-use-case"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"

export async function deleteUser(request :FastifyRequest,reply :FastifyReply){
    const getParamsSchema = z.object({
        id : z.string().uuid()
    })

    const { id} = getParamsSchema.parse(request.params)

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const deleteUserUseCase = new DeleteUserUseCase(prismaUsersRepository)
        const user = await deleteUserUseCase.execute({
            id
        })
        return reply.status(204).send(user)
    } catch (err) {
        if (err instanceof(ResourceNotFoundError)){
            return reply.status(404).send({message:err.message})
        }
        throw err
    }

}