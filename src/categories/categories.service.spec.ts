import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { PrismaService } from 'src/prisma';


const mockPrisma = {
  category: {
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }
}

describe('CategoriesService', () => {
  let service: CategoriesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],

    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    prisma = module.get<PrismaService>(PrismaService);

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });



  describe('findAll', () => {
    it('should return all caategories with item count', async () => {
      const results = [
        { id: 1, name: 'Test', _count: { items: 2 } },
      ];

      mockPrisma.category.findMany.mockResolvedValue(results);
      expect(await service.findAll()).toEqual(results);
      expect(prisma.category.findMany).toHaveBeenCalledWith({
        include: { _count: { select: { items: true } } }
      });
    })
  });

  describe('create', () => {
    it('should create a category', async () => {
      const dto = { name: 'New Category' };
      const result = { id: 1, name: 'New Category' };
      mockPrisma.category.create.mockResolvedValue(result);

      const category = await service.create(dto);
      expect(category).toEqual(result);
      expect(prisma.category.create).toHaveBeenCalledWith({ data: dto });
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const dto = { name: 'Updated' };
      const result = { id: 1, name: 'Updated' };
      mockPrisma.category.update.mockResolvedValue(result);

      const updated = await service.update(1, dto);
      expect(updated).toEqual(result);
      expect(prisma.category.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: dto,
      });
    });
  });

  describe('remove', () => {
    it('should delete a category', async () => {
      const result = { id: 1, name: 'Deleted' };
      mockPrisma.category.delete.mockResolvedValue(result);

      const deleted = await service.remove(1);
      expect(deleted).toEqual(result);
      expect(prisma.category.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

});
