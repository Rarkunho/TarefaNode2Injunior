# Tarefa NodeJs 1 Injunior
Esta segunda tarefa será um complemento da primeira. Iremos
reaproveitar as entidades utilizadas na primeira tarefa, assim como
as rotas já existentes, porém vamos adicionar duas novas
entidades, assim como novos requisitos para o sistema, e modificar
algumas das entidades existentes.

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

### Autenticação - POST:
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
Anote o token de autenticação, pois será utilizado em certas Requisições.

(Usando Insomnia)
### Criação de Usuário - POST:
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

### Criação de Post - POST:
Endereço:
```bash
    http://localhost:3333/posts
```

Corpo JSON:
```bash
    {
        "titulo" : "Post",
	    "conteudo" : "Lorem Ipsum",
	    "created_at" : ""
    }
```

AUTH - Bearer Token : Utilize o token recebido na Autenticação do usuário atual

### Leitura de Usuários - GET:
Endereço:
```Bash
    http://localhost:3333/users/all
```

### Leitura de Posts - GET:
Enderço:
```Bash
    http://localhost:3333/posts/all
```

### Deleção de Usuários - DELETE:
Endereço:
```Bash
    http://localhost:3333/users/:id_usuario
```
AUTH - Bearer Token : Utilize o token recebido na Autenticação do usuário atual

### Deleção de Posts - DELETE:
Endereço: 
```bash
    http://localhost:3333/posts/:id_post
```
AUTH - Bearer Token : Utilize o token recebido na Autenticação do usuário atual

### Atualização de Usuários  - PATCH:
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

AUTH - Bearer Token : Utilize o token recebido na Autenticação do usuário atual

### Atualização de Posts - PATCH:
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

AUTH - Bearer Token : Utilize o token recebido na Autenticação do usuário atual

### Leitura de Usuário - GET:
Endereço:
```Bash
    http://localhost:3333/users/:id_usuario
```

### Leitura de Post - GET:
Endereço:
```Bash
    http://localhost:3333/posts/:id_post
```

### Leitura de Posts com base no Usuário - GET:
Endereço:
```Bash
    http://localhost:3333/users/posts/:id_usuario
```

### Criação de Like - POST:
Endereço:
```Bash
    http://localhost:3333/likes
```

Corpo JSON:
```bash
    {
	"idAutor" : "<id_autor>",
	"created_at" : "",
	"idComentario" : "id_Comentario"
    }
```
OU
```bash
    {
	"idAutor" : "<id_autor>",
	"created_at" : "",
	"idPost" : "id_Post"
    }
```
(Não se pode dar like em um post ou comentário ao mesmo tempo, deve se escolher um)

AUTH - Bearer Token : Utilize o token recebido na Autenticação do usuário atual

### Criação de Comentário - POST:
Endereço:
```Bash
    http://localhost:3333/comment
```

Corpo JSON:
```bash
    {
	"conteudo" : "Conteúdo do comentario",
	"created_at" : "",
	"idAutor" : "id_autor",
	"idPost" : "id_post"
}
```

AUTH - Bearer Token : Utilize o token recebido na Autenticação do usuário atual

### Leitura de Comentários - GET:
Endereço:
```Bash
    http://localhost:3333/comment/getAll
```

### Deleção de Likes - DELETE:
Endereço:
```Bash
    http://localhost:3333/likes/:id_like
```

AUTH - Bearer Token : Utilize o token recebido na Autenticação do usuário atual

### Deleção de Comentários - DELETE:
Endereço:
```Bash
    http://localhost:3333/likes/:id_comentário
```

AUTH - Bearer Token : Utilize o token recebido na Autenticação do usuário atual

### Atualização de Comentários - PATCH:
Endereço: 
```bash
    http://localhost:3333/comment/:id_comentário
```

Corpo JSON (Todos os campos são opcionais):
```bash
    {
	"conteudo" : "Novo Conteúdo",
    "idAutor" : "id_autor",
    "idPost" : "id_post"
    }
```

AUTH - Bearer Token : Utilize o token recebido na Autenticação do usuário atual

### Leitura de Like - GET:
Endereço:
```Bash
    http://localhost:3333/likes/:id_like
```

### Leitura de Comentários - GET:
Endereço:
```Bash
    http://localhost:3333/comment/:id_comentário
```

### Leitura de Likes com base no Usuário - GET:
Endereço:
```Bash
    http://localhost:3333/likes/user/:id_user
```

### Leitura de Likes com base no Post - GET:
Endereço:
```Bash
    http://localhost:3333/likes/post/:id_post
```

### Leitura de Likes com base no Comentário - GET:
Endereço:
```Bash
    http://localhost:3333/likes/comment/:id_comentario
```

### Leitura de Comentários com base no Usuário - GET:
Endereço:
```Bash
    http://localhost:3333/comment/user/:id_user
```

### Leitura de Comentários com base no Post - GET:
Endereço:
```Bash
    http://localhost:3333/comment/post/:id_post
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