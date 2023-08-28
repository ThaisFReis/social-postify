// src/app.module.ts
import { Module } from '@nestjs/common';
import { MediasModule } from './medias/medias.module';
import { PostsModule } from './posts/posts.module';
import { PublicationsModule } from './publications/publications.module';

@Module({
  imports: [MediasModule, PostsModule, PublicationsModule],
})
export class AppModule {}