import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { get } from "./get";
import { deleteUser } from "./delete";
import { update } from "./update";
import { profile } from "./profile";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { refresh } from "./refresh";
import { getAll } from "./getAll";

export function userRoutes(app: FastifyInstance) {
    app.post('/criarUser', register)
    app.post('/authenticate', authenticate)

    app.get('/users/:id', get)
    app.get('/users/all', getAll)
    app.delete('/users/:id', deleteUser)

    app.patch('/users/:id', update)

    app.patch('/token/refresh', refresh)

    // Authenticated
    app.get('/profile', { onRequest: [verifyJWT] }, profile)
}