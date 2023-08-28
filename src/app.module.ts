// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import{ AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { Auth } from './auth/auth.entity'; 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // ou o banco de dados que você está usando
      database: 'mydatabase.sqlite', // nome do arquivo/banco
      entities: [Auth], // registre a entidade aqui
      synchronize: true, // isso cria as tabelas automaticamente, não use em produção
    }),
    AuthModule, // Adicione o módulo AuthModule
  ],
  controllers: [AppController],
})
export class AppModule {}