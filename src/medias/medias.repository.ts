import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMediaDto, UpdateMediaDto } from './media.dto';
import { Media } from './media.entity';

@Injectable()
export class MediasRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateMediaDto): Promise<Media> {
    return this.prisma.media.create({ data });
  }

  async findAll(): Promise<Media[]> {
    return this.prisma.media.findMany();
  }

  async findOne(id: number): Promise<Media | null> {
    return this.prisma.media.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateMediaDto): Promise<Media> {
    return this.prisma.media.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Media> {
    return this.prisma.media.delete({ where: { id } });
  }
}
