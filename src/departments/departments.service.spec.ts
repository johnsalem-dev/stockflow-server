import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentsService } from './departments.service';
import { PrismaService } from 'src/prisma';

const  mockPrisma = {
  department: {
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }
}

describe('DepartmentsService', () => {
  let service: DepartmentsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepartmentsService, {
        provide: PrismaService, useValue: mockPrisma
      }],
    }).compile();

    service = module.get<DepartmentsService>(DepartmentsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Test for findAll
  describe('findAll', () => {
    it('should return all departments', async () => {
      const results = [
        { id: 1, name: 'Human Assests', _count: { employees: 2 } }
      ];
      mockPrisma.department.findMany.mockResolvedValue(results);

      const departments = await service.findAll();
      expect(departments).toEqual(results);
      expect(prisma.department.findMany).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a category', async () => {
      const dto = { name: 'Human Assests' };
      const result =  { id: 1, name: 'Human Assests' };
      mockPrisma.department.create.mockReturnValue(result);
  
      const category = await service.create(dto);
      expect(category).toEqual(result);
      expect(prisma.department.create).toHaveBeenCalledWith({ data: dto });
    });
  })

  describe('update', () => {
    it('should update a department', async () => {
      const dto = { name: 'Updated' };
      const result = { id: 1, name: 'Updated' };
      mockPrisma.department.update.mockResolvedValue(result);

      const updated = await service.update(1, dto);
      expect(updated).toEqual(result);
      expect(prisma.department.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: dto,
      });
    });
  });

  describe('remove', () => {
    it('should delete a department', async () => {
      const result = { id: 1, name: 'Deleted' };
      mockPrisma.department.delete.mockResolvedValue(result);

      const deleted = await service.remove(1);
      expect(deleted).toEqual(result);
      expect(prisma.department.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

});
