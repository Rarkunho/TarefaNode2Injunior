# Tarefa NodeJs 1 Injunior
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

## Requisições/Rotas HTTP:

(Usando Insomnia)
### Criar Usuário - POST:
Endereço:
```bash
    http://localhost:3333/users/
```
Corpo JSON (Foto é opcional):
```bash
    {
	    "nome" : "nomeUsuario",
	    "email" : "emailUsuario@email.com",
	    "senha_digest" : "senha usuário",
	    "foto" : "foto de perfil opcional"
    }
```

### Autenticar Usário - POST:
Endereço:
```bash
    http://localhost:3333/authenticate
```

Corpo JSON:
```bash
    {
	    "email" : "emailUsuario@email.com",
	    "senha_digest" : "senha usuário"
    }
```

### Refresh Token - PATCH:
Endereço:
```bash
    http://localhost:3333/token/refresh
```

Corpo JSON:
```bash
    {
        "email" : "emailUsuario@email.com",
	    "senha_digest" : "senha usuário"
    }
```

### Criar Post - POST:
Endereço:
```bash
    http://localhost:3333/posts
```

Corpo JSON:
```bash
    {
        "titulo" : "Post",
	    "conteudo" : "Lorem Ipsum",
	    "created_at" : "",
	    "idAutor" : id Autor
    }
```

### Ver Usuario - GET:
Endereço:
```Bash
    http://localhost:3333/users/:id_usuario
```

### Ver Post - GET:
Endereço:
```Bash
    http://localhost:3333/posts/:id_post
```

### Ver Todos os Usuarios - GET:
Endereço:
```Bash
    http://localhost:3333/users/all
```

### Ver Todos os Posts - GET:
Enderço:
```Bash
    http://localhost:3333/posts/all
```

### Ver Posts de Um Usuário - GET:
Endereço:
```Bash
    http://localhost:3333/users/posts/:id_usuario
```

### Deletar Usuario - DELETE:
Endereço:
```Bash
    http://localhost:3333/users/:id_usuario
```

### Deletar Post - DELETE:
Endereço: 
```bash
    http://localhost:3333/posts/:id_post
```

### Atualizar Usuario - PATCH:
Endereço:
```bash
    http://localhost:3333/users/:id_usuario
```

Corpo JSON (Todos os campos são opcionais):
```bash
    {
        "nome" : "nomeUsuario",
	    "email" : "emailUsuario@email.com",
	    "senha_digest" : "senha usuário",
	    "foto" : "foto de perfil opcional"
    }
```

### Atualizar Post - PATCH:
Endereço: 
```bash
    http://localhost:3333/posts/:id_post
```

Corpo JSON (Todos os campos são opcionais):
```bash
    {
        "titulo" : "Post",
	    "conteudo" : "Lorem Ipsum",
	    "created_at" : "",
	    "idAutor" : id Autor
    }
```
