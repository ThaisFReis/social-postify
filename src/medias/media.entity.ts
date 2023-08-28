import { Prisma } from '@prisma/client';

export class Media implements Prisma.MediaUncheckedCreateInput {
    id?: number;
    title: string;
    username: string;
    posts?: Prisma.PostCreateNestedManyWithoutMediaInput;
    publication?: Prisma.PublicationCreateNestedManyWithoutMediaInput;
}
