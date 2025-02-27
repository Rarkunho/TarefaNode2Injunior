import { Prisma, Post } from "@prisma/client";

export interface PostUpdateInput {   
    titulo?: string,
    conteudo?: string,
    created_at?: Date,
    idAutor?: string
}


//toda função nova coloca aqui

export interface PostsRepository {
    create(data: Prisma.PostUncheckedCreateInput): Promise<Post>
    delete(id: string): Promise<Post | null>
    getAll(): Promise<Post[] | null>
}