/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `departments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[head_id]` on the table `departments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `departments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "departments" ADD COLUMN     "code" VARCHAR(10) NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "head_id" SMALLINT;

-- AlterTable
CREATE SEQUENCE employees_id_seq;
ALTER TABLE "employees" ALTER COLUMN "id" SET DEFAULT nextval('employees_id_seq');
ALTER SEQUENCE employees_id_seq OWNED BY "employees"."id";

-- CreateIndex
CREATE UNIQUE INDEX "departments_code_key" ON "departments"("code");

-- CreateIndex
CREATE UNIQUE INDEX "departments_head_id_key" ON "departments"("head_id");

-- AddForeignKey
ALTER TABLE "departments" ADD CONSTRAINT "departments_head_id_fkey" FOREIGN KEY ("head_id") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;
