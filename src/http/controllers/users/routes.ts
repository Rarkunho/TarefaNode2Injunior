import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { get } from "./get";
import { deleteUser } from "./delete";

export function userRoutes(app: FastifyInstance){
    app.post('/criarUser', register)
    app.post('/authenticate',authenticate)

    app.get('/users/:id', get)
    app.delete('/users/:id', deleteUser)
}