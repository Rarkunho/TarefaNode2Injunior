import { FastifyInstance } from "fastify";
import { create } from "./create";
import { getAll } from "./getAll";
import { deleteComment } from "./delete";
import { get } from "./get";
import { update } from "./update";
import { getCommentsPost } from "./getPost";
import { getCommentsUser } from "./getUser";

export function commentsRoutes(app: FastifyInstance){
    app.post('/comment', create)
    app.get('/comment/getAll', getAll)
    app.get('/comment/:id', get)
    app.delete('/comment/:id', deleteComment)
    app.patch('/comment/:id', update)
    app.get('/comment/post/:id', getCommentsPost)
    app.get('/comment/user/:id', getCommentsUser)
}