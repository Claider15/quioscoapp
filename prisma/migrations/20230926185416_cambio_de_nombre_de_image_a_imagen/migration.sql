/*
  Warnings:

  - You are about to drop the column `image` on the `producto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `producto` DROP COLUMN `image`,
    ADD COLUMN `imagen` VARCHAR(191) NULL;
