import { FastifyInstance } from "fastify";
import { create } from "./create";
import { deleteLike } from "./delete";

export function likesRoutes(app: FastifyInstance){
    app.post('/likes', create)
    app.delete('/likes/:id', deleteLike)
}