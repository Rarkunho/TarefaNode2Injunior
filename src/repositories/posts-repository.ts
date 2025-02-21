import { Prisma,Post } from "@prisma/client";

//toda função nova coloca aqui

export interface PostsRepository {
    create(data:Prisma.PostUncheckedCreateInput) : Promise<Post>
}