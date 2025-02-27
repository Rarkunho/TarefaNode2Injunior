import { FastifyInstance } from "fastify";
import { create } from "./create";
import { deletePost } from "./delete";
import { getAll } from "./getAll";

export function postsRoutes(app: FastifyInstance) {
    app.post('/posts', create)
    app.get('/posts/all', getAll)
    app.delete('/posts/:id', deletePost)
}