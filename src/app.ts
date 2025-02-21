import { PrismaClient } from '@prisma/client'
import fastify from 'fastify'
import { z } from 'zod'

export const app = fastify()
const prisma = new PrismaClient()

app.get('/', (request,reply) => {
    return {message: 'Hello World'}
})

// model User {
//     id           String  @id @default(uuid())
//     nome         String
//     email        String  @unique
//     senha_digest String
//     foto         String?
//     posts        Post[]
  
//     @@map("Usuarios")
//   }
  
//   model Post {
//     id         String   @id @default(uuid())
//     titulo     String
//     conteudo   String
//     created_at DateTime
//     idAutor    String
//     autor      User     @relation(fields: [idAutor], references: [id])
  
//     @@map("Posts")
//   }

app.post('/', async (request, reply) =>{
    const registerBodySchema = z.object({
        nome: z.string(),
        email: z.string().email(),
        senha_digest: z.string().min(6),
        foto : z.string()
    })

    const { nome,email,senha_digest, foto} = registerBodySchema.parse(request.body)

    await prisma.user.create({
        data: {
            nome,
            email,
            senha_digest,
            foto
        }
    })

    return reply.status(201).send('Usuario criado com sucesso')
})