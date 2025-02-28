import { Prisma , Comentario } from "@prisma/client"

export interface CommentsRepository{
    create(data: Prisma.ComentarioCreateInput): Promise<Comentario>
    delete(id: string): Promise<Comentario | null>
    get(id: string): Promise<Comentario | null>
    getByPost(id: string): Promise<Comentario[] | null>
    getByUser(id: string): Promise<Comentario[] | null>
    update(id: string, data: Prisma.ComentarioUpdateInput): Promise<Comentario | null>
}