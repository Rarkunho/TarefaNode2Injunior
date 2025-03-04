import { Post, Prisma, User } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { UsersRepository, UserUpdateInput } from "../users-repository";

//tudo que for falar com o DB após adicionar no repository acima, coloca aqui

export class PrismaUsersRepository implements UsersRepository {
    async getPosts(id: string): Promise<Post[] | null> {
        const posts = await prisma.post.findMany({
            where: {
                idAutor: id
            }
        })
        return posts
    }
    async getAll(): Promise<User[]> {
        const users = await prisma.user.findMany({})
        return users
    }
    async update(id: string, data: UserUpdateInput): Promise<User | null> {
        const user = await prisma.user.update({
            where: { id },
            data: {
                nome: data.nome,
                email: data.email,
                foto: data.foto,
                senha_digest: data.senha_digest
            }
        })
        return user
    }
    async delete(id: string): Promise<User | null> {
        const user = await prisma.user.delete({
            where: {
                id
            }
        })
        return user
    }
    async findById(id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })
        return user
    }
    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        return user
    }

    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data
        })
        return user
    }
}