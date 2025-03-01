import { Prisma, Like } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { LikesRepository } from "../likes-repository";


export class PrismaLikesRepository implements LikesRepository{
    async create(data: Prisma.LikeUncheckedCreateInput): Promise<Like> {
        const like = await prisma.like.create({
            data: {
                idAutor: data.idAutor,
                created_at: new Date(),
                idPost: data.idPost,
                idComentario: data.idComentario
            }
        })
        return like
    }
    // get(id: string): Promise<Like | null> {
    //     throw new Error("Method not implemented.");
    // }
    // getByPost(id: string): Promise<Like[] | null> {
    //     throw new Error("Method not implemented.");
    // }
    // getByUser(id: string): Promise<Like[] | null> {
    //     throw new Error("Method not implemented.");
    // }
    // getByComment(id: string): Promise<Like[] | null> {
    //     throw new Error("Method not implemented.");
    // }
    // delete(id: string): Promise<Like | null> {
    //     throw new Error("Method not implemented.");
    // }
    
}