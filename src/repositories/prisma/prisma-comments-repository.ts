import { Prisma, Comentario } from "@prisma/client";
import { CommentsRepository } from "../comments-repository";

    
export class PrismaCommentsRepository implements CommentsRepository{
    create(data: Prisma.ComentarioCreateInput): Promise<Comentario> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<Comentario | null> {
        throw new Error("Method not implemented.");
    }
    get(id: string): Promise<Comentario | null> {
        throw new Error("Method not implemented.");
    }
    getByPost(id: string): Promise<Comentario[] | null> {
        throw new Error("Method not implemented.");
    }
    getByUser(id: string): Promise<Comentario[] | null> {
        throw new Error("Method not implemented.");
    }
    update(id: string, data: Prisma.ComentarioUpdateInput): Promise<Comentario | null> {
        throw new Error("Method not implemented.");
    }
    
}