/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "News_published_publishedAt_idx";

-- DropIndex
DROP INDEX "News_slug_idx";

-- DropTable
DROP TABLE "Admin";
