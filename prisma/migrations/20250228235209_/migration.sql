/*
  Warnings:

  - You are about to drop the column `idUser` on the `Likes` table. All the data in the column will be lost.
  - Added the required column `created_at` to the `Likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idAutor` to the `Likes` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Likes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idAutor" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "idPost" TEXT,
    "idComentario" TEXT,
    CONSTRAINT "Likes_idAutor_fkey" FOREIGN KEY ("idAutor") REFERENCES "Usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Likes_idPost_fkey" FOREIGN KEY ("idPost") REFERENCES "Posts" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Likes_idComentario_fkey" FOREIGN KEY ("idComentario") REFERENCES "Comentarios" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Likes" ("id", "idComentario", "idPost") SELECT "id", "idComentario", "idPost" FROM "Likes";
DROP TABLE "Likes";
ALTER TABLE "new_Likes" RENAME TO "Likes";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
