import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('todos')
@Controller('todos')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TodosController {
    constructor(private todosService: TodosService) { }

    @Post()
    async create(@GetUser() user: any, @Body() dto: CreateTodoDto) {
        return this.todosService.create(user.id, dto);
    }

    @Get()
    async findAll(@GetUser() user: any, @Query('completed') completed?: string) {
        return this.todosService.findAll(user.id, completed);
    }

    @Get(':id')
    async findOne(@GetUser() user: any, @Param('id', ParseIntPipe) id: number) {
        return this.todosService.findById(user.id, id);
    }

    @Put(':id')
    async update(
        @GetUser() user: any,
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateTodoDto,
    ) {
        return this.todosService.update(user.id, id, dto);
    }

    @Delete(':id')
    async remove(@GetUser() user: any, @Param('id', ParseIntPipe) id: number) {
        return this.todosService.remove(user.id, id);
    }
}
