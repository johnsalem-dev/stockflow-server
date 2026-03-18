import { ConflictException, Injectable } from '@nestjs/common';
import { Department } from '@prisma/client';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateCategoryDto } from 'src/categories/dto/update-category.dto.';
import { PrismaService } from 'src/prisma';

@Injectable()
export class DepartmentsService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return this.prisma.department.findMany({
            include: { _count: { select: { employees: true } } }
        })
    }

    async create(data: CreateDepartmentDto): Promise<Department> {
            return await this.prisma.department.create({
                data: data
            })
    }

    async update(id: number, data: UpdateCategoryDto): Promise<Department> {
        return await this.prisma.department.update({
            where: { id: id},
            data: data
        })
    }

    async remove(id: number): Promise<Department> {
        return await this.prisma.department.delete({
            where: { id: id }
        })
    }
}
