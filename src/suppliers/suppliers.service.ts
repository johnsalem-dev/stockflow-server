import { Injectable } from '@nestjs/common';
import { Supplier } from '@prisma/client';
import { PrismaService } from 'src/prisma';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SuppliersService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<Supplier[]> {
        return this.prisma.supplier.findMany({
            include: { _count: { select: { purchases: true } } }
        });
    }

    async create(data: CreateSupplierDto): Promise<Supplier> {
        return this.prisma.supplier.create({
            data: data
        });
    }

    async update(id: number, data: UpdateSupplierDto): Promise<Supplier> {
        return this.prisma.supplier.update({
            where: { id },
            data: data
        });
    }

    async delete(id: number): Promise<Supplier> {
        return this.prisma.supplier.delete({
            where: { id }
        });
    }
}
