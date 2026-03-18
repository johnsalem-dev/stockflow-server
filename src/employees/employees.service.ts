import { Injectable } from '@nestjs/common';
import { Employee } from '@prisma/client';
import { PrismaService } from 'src/prisma';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<Employee[]> {
        return this.prisma.employee.findMany({
            include: {
                department: true
            }
        })
    }

    async create(data: CreateEmployeeDto): Promise<Employee> {
        return this.prisma.employee.create({
            data: data
        })
    }

    async update(id: number, data: UpdateEmployeeDto): Promise<Employee> {
        return this.prisma.employee.update({
            where: { id: id },
            data: data
        })
    }
    
    async delete(id: number): Promise<Employee> {
        return this.prisma.employee.delete({
            where: { id: id }
        })
    }
}
