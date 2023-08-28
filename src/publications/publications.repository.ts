import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePublicationDto } from './publications.dto';
import { Publication } from './publications.entity';

@Injectable()
export class PublicationsRepository {
  constructor(private prisma: PrismaService) { }

  async create(data: CreatePublicationDto): Promise<Publication> {
    const prismaCreateInput = {
      mediaId: data.mediaId,
      postId: data.postId,
      scheduledAt: new Date(data.date),
    };

    return this.prisma.publication.create({ data: prismaCreateInput });
  }

  async findAll(): Promise<Publication[]> {
    return this.prisma.publication.findMany();
  }

  async findOne(id: number): Promise<Publication | null> {
    return this.prisma.publication.findUnique({ where: { id } });
  }

  async update(id: number, data: CreatePublicationDto): Promise<Publication> {
    return this.prisma.publication.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Publication> {
    return this.prisma.publication.delete({ where: { id } });
  }
}
