import fastify from 'fastify'
import { z, ZodError } from 'zod'
import { userRoutes } from './http/controllers/users/routes'
import { postsRoutes } from './http/controllers/posts/routes'

export const app = fastify()

app.get('/', (request,reply) => {
    return {message: 'Hello World'}
})

app.register(userRoutes)
app.register(postsRoutes)

app.setErrorHandler((error,request,reply) => {
    if(error instanceof ZodError){
        return reply.status(400).send({message: 'Validation Error (Zod)', issues: error.format()})
    }
    return reply.status(500).send({message: 'Internal Server Error (Problema no código)'})
})