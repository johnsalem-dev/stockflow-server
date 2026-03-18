import { Injectable } from '@nestjs/common';
import { Item } from '@prisma/client';
import { PrismaService } from 'src/prisma';
import { CreateItemDto } from './dto/create-item.dto';
import { GetItemsFilterDto } from './dto/get-items-filter.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
    constructor(private prisma: PrismaService) {}

    findAll(filter: GetItemsFilterDto) {
        const { category, search, lowStock } = filter;

        return this.prisma.inventorySummary.findMany({
            where: {
                group_item: category ? { contains: category, mode: 'insensitive' } : undefined,
                description: search ? { contains: search, mode: 'insensitive' } : undefined,
                current_balance: lowStock ? { lt: 10 } : undefined
            },
            orderBy: {
                description: 'asc'
            }
        });
    }
    //Maybe implement a fallback caategory select liike eg: General
    create(data: CreateItemDto): Promise<Item> {
        return this.prisma.item.create({
            data: data
        });
    }

    update(id: number, data: UpdateItemDto): Promise<Item> {
        return this.prisma.item.update({
            where: { id },
            data: data
        });
    }

    delete(id: number): Promise<Item> {
        return this.prisma.item.delete({
            where: { id }
        });
    }
}
