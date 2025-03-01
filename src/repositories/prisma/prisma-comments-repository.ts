import { Prisma, Comentario } from "@prisma/client";
import { CommentsRepository } from "../comments-repository";
import { prisma } from "@/lib/prisma";
    
export class PrismaCommentsRepository implements CommentsRepository{
    async create(data: Prisma.ComentarioUncheckedCreateInput): Promise<Comentario> {
        const Comentario = await prisma.comentario.create({
                    data: {
                        idAutor: data.idAutor,
                        idPost: data.idPost,
                        conteudo: data.conteudo,
                        created_at: new Date()
                    }
                })
        return Comentario
    }
    // delete(id: string): Promise<Comentario | null> {
    //     throw new Error("Method not implemented.");
    // }
    // get(id: string): Promise<Comentario | null> {
    //     throw new Error("Method not implemented.");
    // }
    // getByPost(id: string): Promise<Comentario[] | null> {
    //     throw new Error("Method not implemented.");
    // }
    // getByUser(id: string): Promise<Comentario[] | null> {
    //     throw new Error("Method not implemented.");
    // }
    // update(id: string, data: Prisma.ComentarioUpdateInput): Promise<Comentario | null> {
    //     throw new Error("Method not implemented.");
    // }
    
}