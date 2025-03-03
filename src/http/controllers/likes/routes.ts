import { FastifyInstance } from "fastify";
import { create } from "./create";
import { deleteLike } from "./delete";
import { get } from "./get";

export function likesRoutes(app: FastifyInstance){
    app.post('/likes', create)
    app.delete('/likes/:id', deleteLike)
    app.get('/likes/:id', get)
}