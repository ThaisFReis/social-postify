import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { MediasService } from './medias.service';
import { CreateMediaDto, UpdateMediaDto } from './media.dto';

@Controller('medias')
export class MediasController {
    constructor(private readonly mediasService: MediasService) { }

    @Post()
    async create(@Body() createMediaDto: CreateMediaDto) {
        try {
            await this.mediasService.create(createMediaDto);

            return { message: 'Media created successfully', statusCode: 201 };
        } catch (error) {
            return { message: 'Media not created', statusCode: 400 };
        }
    }

    @Get()
    async findAll() {
        try {
            const medias = await this.mediasService.findAll();

            return { message: 'Medias retrieved successfully', statusCode: 200, medias };
        } catch (error) {
            return { message: 'Medias not retrieved', statusCode: 400 };
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            const media = await this.mediasService.findOne(+id);

            return { message: 'Media retrieved successfully', statusCode: 200, media };
        } catch (error) {
            return { message: 'Media not retrieved', statusCode: 400 };
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto) {
        try {
            await this.mediasService.update(+id, updateMediaDto);

            return { message: 'Media updated successfully', statusCode: 200 };
        } catch (error) {
            return { message: 'Media not updated', statusCode: 400 };
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        try {
            await this.mediasService.remove(+id);

            return { message: 'Media deleted successfully', statusCode: 200 };
        } catch (error) {
            return { message: 'Media not deleted', statusCode: 400 };
        }
    }
}
