export class MediaDto {}
import { IsNotEmpty } from 'class-validator';

export class CreateMediaDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    username: string;
}

export class UpdateMediaDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    username: string;
}
