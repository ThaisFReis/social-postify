import { Prisma } from '@prisma/client';

export class Post implements Prisma.PostUncheckedCreateInput {
    id?: number;
    title: string;
    text: string;
    image?: string;
}