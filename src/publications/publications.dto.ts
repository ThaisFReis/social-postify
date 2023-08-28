import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreatePublicationDto {
    @IsNotEmpty()
    mediaId: number;

    @IsNotEmpty()
    postId: number;

    @IsNotEmpty()
    @IsDateString()
    date: string;
}
