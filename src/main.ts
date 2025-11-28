import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // validation globally for DTOs
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: false,
            transform: true,
        }),
    );

    // swagger
    const config = new DocumentBuilder()
        .setTitle('Todo + Auth API')
        .setDescription('Assignment APIs Documentation with Swagger')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api', app, document);

    await app.listen(3000);
    console.log('Server started on http://localhost:3000');
    console.log('Swagger at http://localhost:3000/api');
}
bootstrap();
