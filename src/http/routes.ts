import { FastifyInstance } from "fastify";
import { register } from "@/http/controllers/register";
import { authenticate } from "./controllers/authenticate";

export function appRoutes(app: FastifyInstance){
    app.post('/criarUser', register)
    app.post('/authenticate',authenticate)
}