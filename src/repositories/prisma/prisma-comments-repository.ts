import { Prisma, Comentario } from "@prisma/client";
import { CommentsRepository } from "../comments-repository";
import { CommentUpdateInput } from "../comments-repository";
import { prisma } from "@/lib/prisma";
    
export class PrismaCommentsRepository implements CommentsRepository{
    async get(id: string): Promise<Comentario | null> {
            const Comentario = await prisma.comentario.findUnique({
                where: {
                    id
                }
            })
            return Comentario
    }
    async update(id: string, data: CommentUpdateInput): Promise<Comentario | null> {
        const Comentario = await prisma.comentario.update({
            where: { id },
            data: {
                conteudo: data.conteudo,
                idAutor: data.idAutor,
                idPost: data.idPost
            }
        })
        return Comentario
    }
    async delete(id: string): Promise<Comentario | null> {
        const Comentario = await prisma.comentario.delete({
            where: {
                id
            }
        })
        return Comentario
    }
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
    async getAll(): Promise<Comentario[] | null> {
        const Comentarios = await prisma.comentario.findMany({})
        return Comentarios
    }

}