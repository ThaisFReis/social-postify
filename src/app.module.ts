import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { PostsModule } from './posts/posts.module';
import { MediasModule } from './medias/medias.module';
import { PublicationsModule } from './publications/publications.module';

@Module({
  imports: [
    AuthModule,
    PostsModule,
    MediasModule,
    PublicationsModule,
  ],
  controllers: [AppController],
})
export class AppModule { }