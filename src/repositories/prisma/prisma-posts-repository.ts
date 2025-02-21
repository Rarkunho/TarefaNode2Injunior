import { Prisma, User } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { PostsRepository } from "../posts-repository";

//tudo que for falar com o DB coloca aqui

export class PrismaPostsRepository implements PostsRepository{

    async create(data : Prisma.PostUncheckedCreateInput){
        const post = await prisma.post.create({
            data: {
            titulo: data.titulo,
            conteudo: data.conteudo,
            created_at: new Date(),
            idAutor : data.idAutor
            }
        })
        return post
    }
}