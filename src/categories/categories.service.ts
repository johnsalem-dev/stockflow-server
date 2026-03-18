import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from '@prisma/client';
import { UpdateCategoryDto } from './dto/update-category.dto.';

@Injectable()
export class CategoriesService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<Category[]> {
        return this.prisma.category.findMany({
            include: { _count: { select: { items: true}} }
        });
    }

    async create(data: CreateCategoryDto): Promise<Category> {
            return await this.prisma.category.create({
                data: data
            })
    }

    async update(id: number, data: UpdateCategoryDto): Promise<Category>{
        return this.prisma.category.update({
            where: { id },
            data: data,
        })
    }

    async remove(id: number): Promise<Category> {
        // const category = await this.prisma.category.findUnique({ where: { id}, include:{ _count: { select: { items: true } } }});

        // if(!category) throw new NotFoundException('Category not found');

        // if(category._count.items > 0) throw new BadRequestException('Category has items'); 

        return await this.prisma.category.delete({ where: { id } });
    }
}
