/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Usuario";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Usuarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha_digest" TEXT NOT NULL,
    "foto" TEXT
);

-- CreateTable
CREATE TABLE "Posts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "idAutor" TEXT NOT NULL,
    CONSTRAINT "Posts_idAutor_fkey" FOREIGN KEY ("idAutor") REFERENCES "Usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_email_key" ON "Usuarios"("email");
