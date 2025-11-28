import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateTodoDto {
    @ApiPropertyOptional({ example: "Buy milk" })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiPropertyOptional({ example: true })
    @IsBoolean()
    @IsOptional()
    isCompleted?: boolean;
}
