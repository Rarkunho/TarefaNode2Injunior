import { FastifyInstance } from "fastify";
import { create } from "./create";

export function likesRoutes(app: FastifyInstance){
    app.post('/likes', create)
}