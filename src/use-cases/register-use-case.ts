import {hash} from 'bcryptjs'
import {prisma} from '@/lib/prisma'

interface RegisterUseCaseRequest {
    nome : string,
    senha_digest : string,
    email : string,
    foto : string | undefined
}

export async function registerUseCase({nome, senha_digest, email, foto} : RegisterUseCaseRequest){
    const userWithSameEmail = await prisma.user.findUnique({
            where:{
                email
            }
        })
    
        if (userWithSameEmail){
            throw new Error("Usuario já cadastrado")
        }
    
        const password_hash = await hash(senha_digest, 6)
    
    
        await prisma.user.create({
            data: {
                nome,
                email,
                senha_digest : password_hash,
                foto
            }
        })
}