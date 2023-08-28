import { Prisma } from '@prisma/client';

export class Publication implements Prisma.PublicationUncheckedCreateInput {
    id?: number;
    mediaId: number;
    postId: number;
    scheduledAt: Date;
}