import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MediasRepository } from './medias.repository';
import { CreateMediaDto, UpdateMediaDto } from './media.dto';
import { Media } from './media.entity';

@Injectable()
export class MediasService {
    constructor(private readonly mediasRepository: MediasRepository) { }

    async create(data: CreateMediaDto): Promise<Media> {
        if (!data.title || !data.username) {
            throw new HttpException('Missing title or username', HttpStatus.BAD_REQUEST);
        }

        const media = await this.mediasRepository.create(data);

        return media;
    }

    async findAll(): Promise<Media[]> {
        const medias = await this.mediasRepository.findAll();

        if (!medias) {
            throw new HttpException('Medias not found', HttpStatus.NOT_FOUND);
        }

        return medias;
    }

    async findOne(id: number): Promise<Media | null> {
        const media = await this.mediasRepository.findOne(id);

        if (!media) {
            throw new HttpException('Media not found', HttpStatus.NOT_FOUND);
        }

        return media;
    }

    async update(id: number, data: UpdateMediaDto): Promise<Media> {
        if (!id) {
            throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
        }

        if (!data.title || !data.username) {
            throw new HttpException('Missing title or username', HttpStatus.BAD_REQUEST);
        }

        const media = await this.mediasRepository.update(id, data);

        return media;
    }

    async remove(id: number): Promise<Media> {
        if (!id) {
            throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
        }

        const media = await this.mediasRepository.remove(id);

        return media;
    }
}
