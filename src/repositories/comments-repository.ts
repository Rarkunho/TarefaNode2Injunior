import { Prisma , Comentario } from "@prisma/client"

export interface CommentUpdateInput{
    conteudo?: string,
    idAutor?: string,
    idPost?: string
}

export interface CommentsRepository{
    create(data: Prisma.ComentarioUncheckedCreateInput): Promise<Comentario>
    getAll(): Promise<Comentario[] | null>
    delete(id: string): Promise<Comentario | null>
    get(id: string): Promise<Comentario | null>
    getByPost(id: string): Promise<Comentario[] | null>
    getByUser(id: string): Promise<Comentario[] | null>
    update(id: string, data: Prisma.ComentarioUpdateInput): Promise<Comentario | null>
}