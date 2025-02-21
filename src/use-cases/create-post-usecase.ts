import { prisma } from '@/lib/prisma'
import { PostsRepository } from '@/repositories/posts-repository'
import { Post } from '@prisma/client'
import { User } from '@prisma/client'

interface CreatePostCaseRequest {
    titulo : string,
    conteudo : string,
    created_at : Date,
    idAutor : string
}

interface CreatePostCaseResponse {
    post : Post
}

export class CreatePostUseCase{
    constructor(private postsRepository : PostsRepository){}

    async execute({titulo, conteudo, created_at, idAutor}:CreatePostCaseRequest) : Promise<CreatePostCaseResponse>{
        const post = await this.postsRepository.create({
            titulo,
            conteudo,
            created_at,
            idAutor})

        return {post}
    }
    
   
   
}