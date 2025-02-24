# Tarefa NodeJs Injunior
Nessa tarefa vocês farão uma API Rest simples. A ideia para a API
será: uma API que guarda usuários e posts, guardando os posts
que estão associados aos usuários.

## Comandos Básicos

Iniciar Servidor:
```bash
    npm run dev
```

Iniciar Prisma Studio:
```bash
    npx prisma studio
```

Atualizar DB:
```bash
    npx prisma generate
    npx prisma migrate dev
```

## Requisições/Rotas HTTP:

(Usando Insomnia)
### Criar Usuário:
Endereço:
```bash
    http://localhost:3333/criarUser/
```
Corpo JSON:
```bash
    {
	"nome" : "nomeUsuario",
	"email" : "emailUsuario",
	"senha_digest" : "senha usuário",
	"foto" : "foto de perfil opcional"
    }
```

### Autenticar Uusário:
```bash
    http://localhost:3333/authenticate/(ID_Usuario)
```

