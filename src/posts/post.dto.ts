import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePostDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    text: string;

    @IsOptional()
    image: string;
}
