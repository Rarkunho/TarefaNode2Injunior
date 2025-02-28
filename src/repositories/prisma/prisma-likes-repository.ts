import { Prisma, Like } from "@prisma/client";
import { LikesRepository } from "../likes-repository";


export class PrismaLikesRepository implements LikesRepository{
    create(data: Prisma.LikeCreateInput): Promise<Like> {
        throw new Error("Method not implemented.");
    }
    get(id: string): Promise<Like | null> {
        throw new Error("Method not implemented.");
    }
    getByPost(id: string): Promise<Like[] | null> {
        throw new Error("Method not implemented.");
    }
    getByUser(id: string): Promise<Like[] | null> {
        throw new Error("Method not implemented.");
    }
    getByComment(id: string): Promise<Like[] | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<Like | null> {
        throw new Error("Method not implemented.");
    }
    
}