import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    AuthModule,
    PostsModule,
  ],
  controllers: [AppController],
})
export class AppModule { }