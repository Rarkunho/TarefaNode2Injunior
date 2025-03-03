import { FastifyInstance } from "fastify";
import { create } from "./create";
import { getAll } from "./getAll";
import { deleteComment } from "./delete";

export function commentsRoutes(app: FastifyInstance){
    app.post('/comment', create)
    app.get('/comment/getAll', getAll)
    app.delete('/comment/:id', deleteComment)
}