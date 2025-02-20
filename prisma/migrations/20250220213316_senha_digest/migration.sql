/*
  Warnings:

  - You are about to drop the column `senha` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `senha_digest` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha_digest" TEXT NOT NULL,
    "foto" TEXT
);
INSERT INTO "new_Usuario" ("email", "foto", "id", "nome") SELECT "email", "foto", "id", "nome" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
