import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
    constructor(private prisma: PrismaService) { }

    async create(userId: number, dto: CreateTodoDto) {
        return this.prisma.todo.create({
            data: {
                title: dto.title,
                userId,
            },
        });
    }

    // filter: completed=true|false or undefined
    async findAll(userId: number, completed?: string) {
        const where: any = { userId };
        if (completed === 'true') where.isCompleted = true;
        if (completed === 'false') where.isCompleted = false;
        return this.prisma.todo.findMany({ where });
    }

    async findById(userId: number, id: number) {
        const todo = await this.prisma.todo.findUnique({ where: { id } });
        if (!todo) throw new NotFoundException('Todo not found');
        if (todo.userId !== userId) throw new ForbiddenException('Access denied');
        return todo;
    }

    async update(userId: number, id: number, dto: UpdateTodoDto) {
        // console.log("DTO Received →", dto);   // To check weather todo is updated or not.

        const todo = await this.prisma.todo.findUnique({ where: { id } });
        if (!todo) throw new NotFoundException("Todo not found");
        if (todo.userId !== userId) throw new ForbiddenException("Access denied");

        return this.prisma.todo.update({
            where: { id },
            data: {
                ...(dto.title !== undefined && { title: dto.title }),
                ...(dto.isCompleted !== undefined && { isCompleted: dto.isCompleted }),
            },
        });
    }

    async remove(userId: number, id: number) {
        const todo = await this.prisma.todo.findUnique({ where: { id } });
        if (!todo) throw new NotFoundException('Todo not found');
        if (todo.userId !== userId) throw new ForbiddenException('Access denied');
        return this.prisma.todo.delete({ where: { id } });
    }
}
