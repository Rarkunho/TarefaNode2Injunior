-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "foto" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "idAutor" TEXT NOT NULL,
    CONSTRAINT "Post_idAutor_fkey" FOREIGN KEY ("idAutor") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
