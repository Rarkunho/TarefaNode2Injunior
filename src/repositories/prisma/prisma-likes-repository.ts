import { Prisma, Like } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { LikesRepository } from "../likes-repository";


export class PrismaLikesRepository implements LikesRepository{
    async getByPost(id: string): Promise<Like[] | null> {
        const likes = await prisma.like.findMany({
            where: {
                idPost: id
            }
        })
        return likes
    }
    async getByUser(id: string): Promise<Like[] | null> {
        const likes = await prisma.like.findMany({
            where: {
                idAutor: id
            }
        })
        return likes
    }
    async getByComment(id: string): Promise<Like[] | null> {
        const likes = await prisma.like.findMany({
            where: {
                idComentario: id
            }
        })
        return likes
    }
    async get(id: string): Promise<Like | null> {
        const like = await prisma.like.findUnique({
            where: {
                id
            }
        })
        return like
    }
    async delete(id: string): Promise<Like | null> {
        const like = await prisma.like.delete({
            where: {
                id
            }
        })
        return like
    }
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

    
}