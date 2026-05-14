import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { CreateUomDto } from './dto/create-uom.dto';

@Injectable()
export class UomService {
    constructor(private prisma: PrismaService){}

        async findAll(page: number = 1, limit: number = 10, search?: string) {
            const skip = (page - 1) * limit;
            
            const where = search 
            ? { name: { contains: search, mode: 'insensitive' as const } } 
            : undefined;

            const [data, total] = await Promise.all([
            this.prisma.uom.findMany({
                where,
                skip,
                take: limit,
                orderBy: { name: 'asc' },
            }),
            this.prisma.uom.count({ where }),
            ]);

            return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
            };
        }


        async searchDropdown(search?: string) {
            return this.prisma.uom.findMany({
            where: search
                ? { name: { contains: search, mode: 'insensitive' as const } }
                : undefined,
            select: {
                id: true,
                name: true, 
            },
            orderBy: { name: 'asc' },
            take: 20, // Strict cap for performance
            });
        }

      async create(dto: CreateUomDto) {
        const existing = await this.prisma.uom.findUnique({
          where: { name: dto.name },
        });
    
        if (existing) {
          return existing;
        }
    
        return this.prisma.uom.create({
          data: { name: dto.name },
        });
      }
    
      async remove(id: number) {
        return this.prisma.uom.delete({
          where: { id },
        });
      }
}
