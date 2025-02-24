import { Prisma,User } from "@prisma/client";

//toda função nova coloca aqui

export interface UsersRepository {
    create(data:Prisma.UserCreateInput) : Promise<User>
    findByEmail(email: string): Promise<User | null>
    findById(id: string): Promise<User | null>
    delete(id: string): Promise<User | null>
    // update(id: string, data: Prisma.UserUpdateInput): Promise<User | null>
}