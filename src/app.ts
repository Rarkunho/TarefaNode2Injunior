import { PrismaClient } from '@prisma/client'
import fastify from 'fastify'
import { z } from 'zod'
import { appRoutes } from './http/routes'

export const app = fastify()

app.get('/', (request,reply) => {
    return {message: 'Hello World'}
})

app.register(appRoutes)

