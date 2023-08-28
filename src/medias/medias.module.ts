import { Module } from '@nestjs/common';
import { MediasController } from './medias.controller';
import { MediasService } from './medias.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { MediasRepository } from './medias.repository';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [MediasController],
  providers: [MediasService, MediasRepository],
})
export class MediasModule {}
