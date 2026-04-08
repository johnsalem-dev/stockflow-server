/*
  Warnings:

  - You are about to drop the column `name` on the `employees` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[employee_id]` on the table `employees` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `employees` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `designation` to the `employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employee_id` to the `employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_name` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employees" DROP COLUMN "name",
ADD COLUMN     "designation" VARCHAR(100) NOT NULL,
ADD COLUMN     "email" VARCHAR(255) NOT NULL,
ADD COLUMN     "employee_id" VARCHAR(20) NOT NULL,
ADD COLUMN     "full_name" VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "employees_employee_id_key" ON "employees"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");
