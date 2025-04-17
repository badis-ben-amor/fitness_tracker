/*
  Warnings:

  - You are about to drop the column `isAdmins` on the `user` table. All the data in the column will be lost.
  - You are about to alter the column `isAdmin` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `isAdmins`,
    MODIFY `isAdmin` BOOLEAN NOT NULL DEFAULT false;
