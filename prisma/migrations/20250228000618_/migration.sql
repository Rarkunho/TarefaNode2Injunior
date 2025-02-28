-- CreateTable
CREATE TABLE "Comentarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "conteudo" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "idAutor" TEXT NOT NULL,
    "idPost" TEXT NOT NULL,
    CONSTRAINT "Comentarios_idAutor_fkey" FOREIGN KEY ("idAutor") REFERENCES "Usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comentarios_idPost_fkey" FOREIGN KEY ("idPost") REFERENCES "Posts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Likes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idUser" TEXT NOT NULL,
    "idPost" TEXT,
    "idComentario" TEXT,
    CONSTRAINT "Likes_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "Usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Likes_idPost_fkey" FOREIGN KEY ("idPost") REFERENCES "Posts" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Likes_idComentario_fkey" FOREIGN KEY ("idComentario") REFERENCES "Comentarios" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
