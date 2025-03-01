import { FastifyInstance } from "fastify";
import { create } from "./create";
import { getAll } from "./getAll";

export function commentsRoutes(app: FastifyInstance){
    app.post('/comment', create)
    app.get('/comment/getAll', getAll)
}