import { FastifyInstance } from "fastify";
import { register } from "@/http/controllers/register";

export function appRoutes(app: FastifyInstance){
    app.post('/criarUser', register)
}