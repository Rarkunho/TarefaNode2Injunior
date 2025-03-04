import { FastifyInstance } from "fastify";
import { create } from "./create";
import { deleteLike } from "./delete";
import { get } from "./get";
import { getLikesPost } from "./getPost";
import { getLikesUser } from "./getUser";
import { getLikesComment } from "./getComment";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

export function likesRoutes(app: FastifyInstance){
    app.post('/likes', { onRequest: [verifyJWT] }, create)
    app.delete('/likes/:id', { onRequest: [verifyJWT] }, deleteLike)
    app.get('/likes/:id', get)
    app.get('/likes/post/:id', getLikesPost)
    app.get('/likes/user/:id', getLikesUser)
    app.get('/likes/comment/:id', getLikesComment)
}