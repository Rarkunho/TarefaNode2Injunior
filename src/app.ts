import fastify from 'fastify'
import { ZodError } from 'zod'
import { userRoutes } from './http/controllers/users/routes'
import { postsRoutes } from './http/controllers/posts/routes'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { env } from './env'
import fastifyCors from '@fastify/cors'
import { likesRoutes } from './http/controllers/likes/routes'
import { commentsRoutes } from './http/controllers/comments/routes'

export const app = fastify()

app.register(fastifyCors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
})

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: "refreshToken",
        signed: false
    },
    sign: {
        expiresIn: '10m'
    }
})

app.register(fastifyCookie)

app.register(userRoutes)
app.register(postsRoutes)
app.register(likesRoutes)
app.register(commentsRoutes)

app.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({ message: 'Validation Error (Zod)', issues: error.format() })
    }
    return reply.status(500).send({ message: 'Internal Server Error (Problema no código):', error })
})