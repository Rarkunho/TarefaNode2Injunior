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
    get(id: string): Promise<Post | null>
    delete(id: string): Promise<Post | null>
    getAll(): Promise<Post[] | null>
    update(id: string, data: PostUpdateInput): Promise<Post | null>
    getByUser(id: string): Promise<Post[] | null>
}