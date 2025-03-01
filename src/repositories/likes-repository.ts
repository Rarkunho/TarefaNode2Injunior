import { Like, Prisma } from "@prisma/client";



export interface LikesRepository{
    create(data: Prisma.LikeUncheckedCreateInput): Promise<Like>
    // get(id: string): Promise<Like | null>
    // getByPost(id: string): Promise<Like[] | null>
    // getByUser(id: string): Promise<Like[] | null>
    // getByComment(id: string): Promise<Like[] | null>
    // delete(id: string): Promise<Like | null>

}