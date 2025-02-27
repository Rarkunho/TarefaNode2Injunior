import { Post, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { PostsRepository, PostUpdateInput } from "../posts-repository";

//tudo que for falar com o DB coloca aqui

export class PrismaPostsRepository implements PostsRepository {
    async getByUser(id: string): Promise<Post[] | null> {
        const posts = await prisma.post.findMany({
            where: {
                idAutor: id
            }
        })
        return posts
    }
    async get(id: string): Promise<Post | null> {
        const post = await prisma.post.findUnique({
            where: {
                id
            }
        })
        return post
    }
    async getAll(): Promise<Post[] | null> {
        const posts = await prisma.post.findMany({})
        return posts
    }
    async create(data: Prisma.PostUncheckedCreateInput) {
        const post = await prisma.post.create({
            data: {
                titulo: data.titulo,
                conteudo: data.conteudo,
                created_at: new Date(),
                idAutor: data.idAutor
            }
        })
        return post
    }
    async delete(id: string): Promise<Post | null> {
            const post = await prisma.post.delete({
                where: {
                    id
                }
            })
            return post
    }

    async update(id: string, data: PostUpdateInput): Promise<Post | null> {
           const post = await prisma.post.update({
               where: { id },
               data: {
                    titulo: data.titulo,
                    conteudo: data.conteudo,
                    created_at: data.created_at,
                    idAutor: data.idAutor
               }
           })
           return post
       }
}