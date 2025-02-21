import { PrismaClient } from '@prisma/client'
import fastify from 'fastify'
import { z, ZodError } from 'zod'
import { appRoutes } from './http/routes'
import { request } from 'http'

export const app = fastify()

app.get('/', (request,reply) => {
    return {message: 'Hello World'}
})

app.register(appRoutes)

app.setErrorHandler((error,request,reply) => {
    if(error instanceof ZodError){
        return reply.status(400).send({message: 'Validation Error (Zod)', issues: error.format()})
    }
    return reply.status(500).send({message: 'Internal Server Error (Problema no código)'})
})