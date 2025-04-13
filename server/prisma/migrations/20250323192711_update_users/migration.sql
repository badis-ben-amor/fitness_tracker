/*
  Warnings:

  - Added the required column `isAdmin` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isAdmins` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `isAdmin` VARCHAR(191) NOT NULL,
    ADD COLUMN `isAdmins` VARCHAR(191) NOT NULL;
