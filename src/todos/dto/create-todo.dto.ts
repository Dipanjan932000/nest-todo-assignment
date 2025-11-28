import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
    @ApiProperty({ example: 'Buy groceries' })
    @IsNotEmpty()
    title: string;
}
