import { FastifyInstance } from "fastify";
import { create } from "./create";
import { deletePost } from "./delete";
import { getAll } from "./getAll";
import { get } from "./get";
import { update } from "./update";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

export function postsRoutes(app: FastifyInstance) {
    app.post('/posts', { onRequest: [verifyJWT] } , create)
    app.get('/posts/:id', get)
    app.get('/posts/all', getAll)
    app.delete('/posts/:id', { onRequest: [verifyJWT] }, deletePost)
    app.patch('/posts/:id', { onRequest: [verifyJWT] }, update)
}