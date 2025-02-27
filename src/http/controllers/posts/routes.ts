import { FastifyInstance } from "fastify";
import { create } from "./create";
import { deletePost } from "./delete";
import { getAll } from "./getAll";
import { get } from "./get";
import { update } from "./update";

export function postsRoutes(app: FastifyInstance) {
    app.post('/posts', create)
    app.get('/posts/:id', get)
    app.get('/posts/all', getAll)
    app.delete('/posts/:id', deletePost)
    app.patch('/posts/:id', update)
}