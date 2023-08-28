// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Usar um pipe de validação global para validar o corpo das requisições
  app.useGlobalPipes(new ValidationPipe());

  // Incluir a rota de saúde
  app.get('/health', (req, res) => {
    res.status(200).json({ message: 'I’m okay!' });
  });

  // Iniciar o servidor na porta 3000
  await app.listen(3000);
}
bootstrap();
