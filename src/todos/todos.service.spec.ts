import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from '../todos/todos.service';
import { PrismaService } from '../prisma/prisma.service';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

describe('TodosService - findById()', () => {
    let service: TodosService;

    const mockPrisma = {
        todo: {
            findUnique: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TodosService,
                { provide: PrismaService, useValue: mockPrisma },
            ],
        }).compile();

        service = module.get<TodosService>(TodosService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return a todo if it belongs to the user', async () => {
        const mockTodo = {
            id: 1,
            title: 'Test Todo',
            isCompleted: false,
            userId: 5,
        };

        mockPrisma.todo.findUnique.mockResolvedValue(mockTodo);

        const result = await service.findById(5, 1);

        expect(result).toEqual(mockTodo);
        expect(mockPrisma.todo.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw ForbiddenException if todo belongs to another user', async () => {
        const mockTodo = {
            id: 1,
            title: 'Test Todo',
            isCompleted: false,
            userId: 9, // Belongs to another user
        };

        mockPrisma.todo.findUnique.mockResolvedValue(mockTodo);

        await expect(service.findById(5, 1)).rejects.toThrow(ForbiddenException);
    });

    it('should throw NotFoundException if todo does not exist', async () => {
        mockPrisma.todo.findUnique.mockResolvedValue(null);

        await expect(service.findById(5, 999)).rejects.toThrow(NotFoundException);
    });
});
