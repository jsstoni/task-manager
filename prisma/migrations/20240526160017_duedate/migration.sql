/*
  Warnings:

  - Made the column `duedate` on table `tasks` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `tasks` MODIFY `duedate` DATETIME(3) NOT NULL;
