import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './publications.dto';

@Controller('publications')
export class PublicationsController {
    constructor(private readonly publicationsService: PublicationsService) {}

    @Post()
    async create(@Body() createPublicationDto: CreatePublicationDto) {
        try {
            await this.publicationsService.create(createPublicationDto);
            return { message: 'Publication created successfully', statusCode: 201 };
        } catch (error) {
            return { message: 'Publication not created', statusCode: 400 };
        }
    }

    @Get()
    async findAll() {
        try {
            const publications = await this.publicationsService.findAll();
            return { message: 'Publications retrieved successfully', statusCode: 200, publications };
        } catch (error) {
            return { message: 'Publications not retrieved', statusCode: 400 };
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            const publication = await this.publicationsService.findOne(+id);
            return { message: 'Publication retrieved successfully', statusCode: 200, publication };
        } catch (error) {
            return { message: 'Publication not retrieved', statusCode: 400 };
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updatePublicationDto: CreatePublicationDto) {
        try {
            await this.publicationsService.update(+id, updatePublicationDto);
            return { message: 'Publication updated successfully', statusCode: 200 };
        } catch (error) {
            return { message: 'Publication not updated', statusCode: 400 };
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        try {
            await this.publicationsService.remove(+id);
            return { message: 'Publication deleted successfully', statusCode: 200 };
        } catch (error) {
            return { message: 'Publication not deleted', statusCode: 400 };
        }
    }
}
