import { Injectable, HttpException, HttpStatus, ForbiddenException } from '@nestjs/common';
import { PublicationsRepository } from './publications.repository';
import { CreatePublicationDto } from './publications.dto';
import { Publication } from './publications.entity';

@Injectable()
export class PublicationsService {
    constructor(private readonly publicationsRepository: PublicationsRepository) { }

    async create(data: CreatePublicationDto): Promise<Publication> {
        if (!data.mediaId || !data.postId || !data.date) {
            throw new HttpException('Missing mediaId, postId, or date', HttpStatus.BAD_REQUEST);
        }

        const publication = await this.publicationsRepository.create(data);

        return publication;
    }

    async findAll(): Promise<Publication[]> {
        const publications = await this.publicationsRepository.findAll();
        return publications;
    }

    async findOne(id: number): Promise<Publication | null> {
        const publication = await this.publicationsRepository.findOne(id);
        if (!publication) {
            throw new HttpException('Publication not found', HttpStatus.NOT_FOUND);
        }
        return publication;
    }

    async update(id: number, data: CreatePublicationDto): Promise<Publication> {
        const publication = await this.publicationsRepository.findOne(id);
        if (!publication) {
            throw new HttpException('Publication not found', HttpStatus.NOT_FOUND);
        }

        if (publication.scheduledAt <= new Date()) {
            throw new ForbiddenException('Cannot update published or past publications');
        }

        return this.publicationsRepository.update(id, data);
    }

    async remove(id: number): Promise<Publication> {
        const publication = await this.publicationsRepository.remove(id);
        if (!publication) {
            throw new HttpException('Publication not found', HttpStatus.NOT_FOUND);
        }
        return publication;
    }
}
