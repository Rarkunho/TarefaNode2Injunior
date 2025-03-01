import { FastifyInstance } from "fastify";
import { create } from "./create";

export function commentsRoutes(app: FastifyInstance){
    app.post('/comment', create)
}