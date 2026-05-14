import { Injectable } from '@nestjs/common';
import { Purchase, TransactionStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { GetPurchasesFilterDto } from './dto/get-purchases-filter.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';

@Injectable()
export class PurchasesService {
    constructor(private prisma: PrismaService) {}

    async findAll(filter: GetPurchasesFilterDto) {
        const { supplierId, startDate, referenceNo, page, limit } = filter;
        
        const skip = (page - 1) * limit;

        const where: any = {
            supplierId: supplierId ?? undefined,
            purchaseDate: startDate ? { gte: new Date(startDate) } : undefined,
            referenceNo: referenceNo ? { contains: referenceNo, mode: 'insensitive' } : undefined
        }

        const [purchases, totalCount ] = await Promise.all([
            this.prisma.purchase.findMany({
                where,
                include: {
                    items: {
                        include: {
                            item: true
                        }
                    },
                    supplier: true
                },
                orderBy: { purchaseDate: 'desc' },
                skip,
                take: limit
                }),
            this.prisma.purchase.count({ where })
        ]);

        return {
            data: purchases,
            meta: {
                total: totalCount,
                page,
                limit,
                totalPages: Math.ceil(totalCount / limit)
            }
        }
    }

    create(data: CreatePurchaseDto): Promise<Purchase> {
        const { items, ...purchaseData } = data;
      
        return this.prisma.purchase.create({
          data: {
            ...purchaseData,
      
            // nested write for PurchaseItem[]
            items: {
              create: items.map(item => ({
                itemId: item.itemId,
                quantity: item.quantity,
                rate: item.rate ?? null,
              })),
            },
          },
      
          include: {
            items: true, // optional: return created line items
          },
        });
      }

    update(id: number, data: UpdatePurchaseDto): Promise<Purchase> | undefined {
        const { items, ...purchaseData } = data;
        if(items)
        return this.prisma.purchase.update({
            where: { id },
            data: {
                ...purchaseData,
               ...(items && {
                items: {
                    deleteMany: {},
                    create: items.map(item => ({
                        itemId: item.itemId,
                        quantity: item.quantity,
                        rate: item.rate ?? null,
                      })), 
            }})
        }});
    }

    delete(id: number): Promise<Purchase> {
        return this.prisma.purchase.delete({
            where: { id }
        });
    }

    async updateStatus(id: number, status: TransactionStatus): Promise<Purchase> {
        // Business Logic Tip: You could check the current status here before updating
        return this.prisma.purchase.update({
            where: { id },
            data: { status },
            include: { items: true } // Useful for the frontend to confirm state
        });
    }
}
