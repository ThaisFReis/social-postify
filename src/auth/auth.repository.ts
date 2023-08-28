import { Injectable } from '@nestjs/common';
import { Auth } from './auth.entity';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class AuthRepository {
    constructor(private prisma: PrismaService) {}

    async create(username: string, password: string, avatar: string, id: string): Promise<User> {
        return this.prisma.user.create({
            data: {
                username,
                password,
                avatar,
                id
            },
        });
    }

    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async findByUsername(username: string): Promise<User> {
        return this.prisma.user.findUnique({
            where: {
                username,
            },
        });
    }

}