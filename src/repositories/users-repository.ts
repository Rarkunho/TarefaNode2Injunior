import { Prisma, User } from "@prisma/client";

export interface UserUpdateInput {
    nome?: string,
    email?: string,
    foto?: string,
    senha_digest?: string
}

//toda função nova coloca aqui (você COMEÇA por aqui)

export interface UsersRepository {
    create(data: Prisma.UserCreateInput): Promise<User>
    getAll(): Promise<User[] | null>
    findByEmail(email: string): Promise<User | null>
    findById(id: string): Promise<User | null>
    delete(id: string): Promise<User | null>
    update(id: string, data: UserUpdateInput): Promise<User | null>
}