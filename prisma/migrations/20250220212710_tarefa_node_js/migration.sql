-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "foto" TEXT
);
INSERT INTO "new_Usuario" ("email", "foto", "id", "nome", "senha") SELECT "email", "foto", "id", "nome", "senha" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
