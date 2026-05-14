import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from '@prisma/client';
import { PrismaService } from 'src/prisma';
import { CreateItemDto } from './dto/create-item.dto';
import { GetItemsFilterDto } from './dto/get-items-filter.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
    constructor(private prisma: PrismaService) { }

    async findAll(filter: GetItemsFilterDto) {
        const { category, search, lowStock, page, limit } = filter;


        const skip = (page - 1) * limit;

        const where: any = {
            group_item: category ? { contains: category, mode: 'insensitive' } : undefined,
            description: search ? { contains: search, mode: 'insensitive' } : undefined,
            current_balance: lowStock ? { lt: 10 } : undefined
        };

        const [items, totalCount] = await Promise.all([
            this.prisma.inventorySummary.findMany({
                where,
                skip,
                take: limit,
                orderBy: { item_sku: 'asc' }
            }),
            this.prisma.inventorySummary.count({ where })
        ]);

        return {
            data: items,
            meta: {
                total: totalCount,
                page,
                limit,
                totalPages: Math.ceil(totalCount / limit)
            }
        };
    }

    async findOne(id: number) {
        const item = this.prisma.item.findUnique({
            where: { id },
            include: {
              category: true,
        
              purchaseItems: {
                include: {
                  purchase: {
                    include: {
                      supplier: true,
                    },
                  },
                },
                orderBy: {
                  purchase: {
                    createdAt: 'desc',
                  },
                },
              },
        
              issuances: {
                include: {
                  employee: true,
                },
                orderBy: {
                  issuanceDate: 'desc',
                },
              },
            },
          });

        if (!item) throw new NotFoundException(`Item with ID ${id} not found`);

        // Grab the current balance from the view for this specific ID
        const summary = await this.prisma.inventorySummary.findFirst({
            where: { item_id: id }
        });

        return {
            ...item,
            current_balance: summary?.current_balance || 0,
            total_purchased: summary?.total_purchased || 0,
            total_issued: summary?.total_issued || 0
        };
    }

    async create(data: CreateItemDto): Promise<Item> {
        const { categoryId, uomId, sku, ...rest } = data;

        let finalSku = sku;

        if(finalSku && finalSku.endsWith('XXX')){
            const basePrefix = finalSku.replace('XXX', '');

            const lastItem = await this.prisma.item.findFirst({
                where: {
                    sku: { startsWith: basePrefix }
                },
                orderBy: {
                    sku: 'desc'
                },
            });

            let nextSequence = 1;

            if(lastItem){

                const lastSequenceStr = lastItem.sku.replace(basePrefix, '');
                const lastSequenceNum = parseInt(lastSequenceStr, 10);

                if (!isNaN(lastSequenceNum)) {
                    nextSequence = lastSequenceNum + 1;
                  }    
            }

            const paddedSequence = nextSequence.toString().padStart(3, '0');
            finalSku = `${basePrefix}${paddedSequence}`;
        }

        return this.prisma.item.create({
            data: {
                ...rest,
                sku: finalSku,
                uom: { connect: { id: uomId } },
                category: categoryId ? { connect: { id: categoryId } } : undefined,
            },
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
