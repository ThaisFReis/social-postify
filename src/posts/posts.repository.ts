import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './post.dto';
import { Post } from './post.entity';

@Injectable()
export class PostsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePostDto): Promise<Post> {
    return this.prisma.post.create({ data });
  }

  async findAll(): Promise<Post[]> {
    return this.prisma.post.findMany();
  }

  async findOne(id: number): Promise<Post | null> {
    return this.prisma.post.findUnique({ where: { id } });
  }

  async update(id: number, data: CreatePostDto): Promise<Post> {
    return this.prisma.post.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Post> {
    return this.prisma.post.delete({ where: { id } });
  }
}