import { FastifyInstance } from "fastify";
import { create } from "./create";
import { deletePost } from "./delete";

export function postsRoutes(app: FastifyInstance) {
    app.post('/posts', create)
    app.delete('/posts/:id', deletePost)
}