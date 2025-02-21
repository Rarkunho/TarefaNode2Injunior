import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";

export function userRoutes(app: FastifyInstance){
    app.post('/criarUser', register)
    app.post('/authenticate',authenticate)
}