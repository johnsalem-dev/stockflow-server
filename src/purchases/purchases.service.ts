import { Injectable } from '@nestjs/common';
import { Purchase } from '@prisma/client';
import { PrismaService } from 'src/prisma';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { GetPurchasesFilterDto } from './dto/get-purchases-filter.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';

@Injectable()
export class PurchasesService {
    constructor(private prisma: PrismaService) {}

    findAll(filter: GetPurchasesFilterDto) {
        const { supplierId, startDate, referenceNo } = filter;
        //Filter sourcetype and add search using item
        return this.prisma.purchase.findMany({
            where: {
                supplierId: supplierId ?? undefined,
                purchaseDate: startDate ? { gte: new Date(startDate) } : undefined,
                referenceNo: referenceNo ? { contains: referenceNo, mode: 'insensitive' } : undefined
            },
            include: {
                item: true,
                supplier: true
            },
            orderBy: { purchaseDate: 'desc' }
        });
    }

    create(data: CreatePurchaseDto): Promise<Purchase> {
        return this.prisma.purchase.create({
            data: data
        });
    }

    update(id: number, data: UpdatePurchaseDto): Promise<Purchase> {
        return this.prisma.purchase.update({
            where: { id },
            data: data
        });
    }

    delete(id: number): Promise<Purchase> {
        return this.prisma.purchase.delete({
            where: { id }
        });
    }
}
